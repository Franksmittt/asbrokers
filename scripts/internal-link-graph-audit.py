#!/usr/bin/env python3
"""
Internal link graph audit for AS Brokers.

Builds a directed graph of internal links by:
1) Reading sitemap.xml
2) Fetching page HTML
3) Extracting internal <a href="..."> targets

Usage:
  python3 scripts/internal-link-graph-audit.py
  python3 scripts/internal-link-graph-audit.py --base-url http://localhost:3000

Outputs a plaintext findings report to project root by default:
  asbrokers_internal_link_graph_audit_findings.txt
"""

from __future__ import annotations

import argparse
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter, deque
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Set, Tuple


DEFAULT_BASE_URL = "https://www.asbrokers.co.za"
DEFAULT_OUTPUT = "asbrokers_internal_link_graph_audit_findings.txt"
REQUEST_TIMEOUT = 20
MAX_URLS_DEFAULT = 120
HTML_SKIP_EXTENSIONS = (
    ".xml",
    ".txt",
    ".kml",
    ".json",
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
)


@dataclass
class Finding:
    severity: str
    message: str


class InternalLinkGraphAudit:
    def __init__(self, base_url: str, max_urls: int, output_path: Path) -> None:
        self.base_url = base_url.rstrip("/")
        self.max_urls = max_urls
        self.output_path = output_path
        self.findings: List[Finding] = []

    def add(self, severity: str, message: str) -> None:
        self.findings.append(Finding(severity=severity, message=message))

    def request(self, url: str) -> Tuple[int, str, Dict[str, str], str]:
        req = urllib.request.Request(
            url,
            headers={
                "User-Agent": "ASBrokersLinkAudit/1.0 (+https://www.asbrokers.co.za)",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=REQUEST_TIMEOUT) as resp:
                status = resp.getcode()
                final_url = resp.geturl()
                headers = {k.lower(): v for k, v in resp.headers.items()}
                body = resp.read().decode("utf-8", errors="replace")
                return status, final_url, headers, body
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace") if exc.fp else ""
            headers = {k.lower(): v for k, v in (exc.headers.items() if exc.headers else [])}
            return exc.code, url, headers, body
        except Exception:
            return 0, url, {}, ""

    def normalize_url(self, url: str) -> str:
        parsed = urllib.parse.urlparse(url)
        scheme = parsed.scheme.lower() or "https"
        netloc = parsed.netloc.lower()
        path = parsed.path or "/"
        if path != "/" and path.endswith("/"):
            path = path[:-1]
        return f"{scheme}://{netloc}{path}"

    def to_path(self, url: str) -> str:
        parsed = urllib.parse.urlparse(url)
        path = parsed.path or "/"
        if path != "/" and path.endswith("/"):
            path = path[:-1]
        return path

    def is_html_candidate(self, url: str) -> bool:
        path = urllib.parse.urlparse(url).path.lower()
        return not any(path.endswith(ext) for ext in HTML_SKIP_EXTENSIONS)

    def rewrite_to_base_host(self, url: str) -> str:
        """Map sitemap absolute URLs onto the audit base host, e.g. localhost staging."""
        base_parsed = urllib.parse.urlparse(self.base_url)
        url_parsed = urllib.parse.urlparse(url)
        if url_parsed.netloc.lower() == base_parsed.netloc.lower():
            return url
        scheme = base_parsed.scheme or "https"
        netloc = base_parsed.netloc
        path = url_parsed.path or "/"
        return f"{scheme}://{netloc}{path}"

    def allowed_hosts(self) -> Set[str]:
        parsed = urllib.parse.urlparse(self.base_url)
        host = parsed.netloc.lower()
        if not host:
            return set()
        bare = host.replace("www.", "")
        return {host, bare, f"www.{bare}"}

    def parse_sitemap(self) -> List[str]:
        sitemap_url = f"{self.base_url}/sitemap.xml"
        status, _, _, body = self.request(sitemap_url)
        if status != 200:
            self.add("HIGH", f"sitemap.xml not reachable (status {status}).")
            return []

        try:
            root = ET.fromstring(body)
            ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            nodes = root.findall(".//sm:url/sm:loc", ns)
            if not nodes:
                nodes = root.findall(".//url/loc")
            raw_urls = [n.text.strip() for n in nodes if n.text and n.text.strip()]
            urls = [self.rewrite_to_base_host(u) for u in raw_urls]
            urls = [u for u in urls if self.is_html_candidate(u)]

            # Deduplicate, preserving sitemap order.
            seen: Set[str] = set()
            deduped: List[str] = []
            for url in urls:
                key = self.normalize_url(url)
                if key in seen:
                    continue
                seen.add(key)
                deduped.append(url)
            return deduped[: self.max_urls]
        except Exception as exc:
            self.add("HIGH", f"Failed to parse sitemap.xml: {exc}")
            return []

    def extract_internal_links(self, html: str, page_url: str, allowed_hosts: Set[str]) -> Set[str]:
        links: Set[str] = set()
        hrefs = re.findall(r'<a[^>]+href=["\']([^"\']+)["\']', html, flags=re.IGNORECASE)
        for href in hrefs:
            if href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:") or href.startswith("javascript:"):
                continue
            abs_url = urllib.parse.urljoin(page_url, href)
            parsed = urllib.parse.urlparse(abs_url)
            if parsed.netloc.lower() not in allowed_hosts:
                continue
            links.add(self.normalize_url(abs_url))
        return links

    def run(self) -> None:
        sitemap_urls = self.parse_sitemap()
        if not sitemap_urls:
            self.write_report({}, {}, {})
            return

        canonical_nodes = {self.normalize_url(u): u for u in sitemap_urls}
        node_set = set(canonical_nodes.keys())
        home = self.normalize_url(self.base_url + "/")
        hosts = self.allowed_hosts()

        out_edges: Dict[str, Set[str]] = {node: set() for node in node_set}
        in_degree: Counter[str] = Counter({node: 0 for node in node_set})

        crawl_failures = 0
        for node in node_set:
            status, final_url, _, body = self.request(node)
            if status != 200:
                crawl_failures += 1
                self.add("MEDIUM", f"Page fetch not 200: {node} (status {status})")
                continue
            links = self.extract_internal_links(body, final_url, hosts)
            # Keep only links that exist in the sitemap graph.
            links = {link for link in links if link in node_set}
            out_edges[node] = links
            for target in links:
                in_degree[target] += 1

        # BFS depth from homepage.
        depth: Dict[str, int] = {}
        if home in node_set:
            q: deque[Tuple[str, int]] = deque([(home, 0)])
            depth[home] = 0
            while q:
                current, distance = q.popleft()
                for next_url in out_edges.get(current, set()):
                    if next_url not in depth:
                        depth[next_url] = distance + 1
                        q.append((next_url, distance + 1))
        else:
            self.add("HIGH", "Homepage URL is not present in sitemap node set.")

        non_home_nodes = [node for node in node_set if node != home]
        orphans = [node for node in non_home_nodes if in_degree[node] == 0]
        unreachable = [node for node in non_home_nodes if node not in depth]
        no_outgoing = [node for node in non_home_nodes if len(out_edges[node]) == 0]
        deep_pages = [node for node, distance in depth.items() if distance > 3]

        if orphans:
            self.add("HIGH", f"Orphan pages (in-degree=0): {len(orphans)}")
        if unreachable:
            self.add("HIGH", f"Pages unreachable from homepage click graph: {len(unreachable)}")
        if crawl_failures:
            self.add("MEDIUM", f"Pages with non-200 fetch during crawl: {crawl_failures}")
        if no_outgoing:
            self.add("LOW", f"Pages with no outgoing internal links: {len(no_outgoing)}")
        if deep_pages:
            self.add("LOW", f"Pages deeper than 3 clicks from homepage: {len(deep_pages)}")

        self.write_report(
            out_edges=out_edges,
            in_degree=dict(in_degree),
            depth=depth,
        )

    def write_report(
        self,
        out_edges: Dict[str, Set[str]],
        in_degree: Dict[str, int],
        depth: Dict[str, int],
    ) -> None:
        severity_order = {"HIGH": 0, "MEDIUM": 1, "LOW": 2}
        sorted_findings = sorted(self.findings, key=lambda f: severity_order[f.severity])

        high = sum(1 for f in sorted_findings if f.severity == "HIGH")
        med = sum(1 for f in sorted_findings if f.severity == "MEDIUM")
        low = sum(1 for f in sorted_findings if f.severity == "LOW")

        lines: List[str] = []
        lines.append("INTERNAL LINK GRAPH AUDIT FINDINGS")
        lines.append("=" * 33)
        lines.append(f"Base URL: {self.base_url}")
        lines.append("")
        lines.append(f"Total findings: {len(sorted_findings)}")
        lines.append(f"HIGH: {high} | MEDIUM: {med} | LOW: {low}")
        lines.append("")

        if not sorted_findings:
            lines.append("No internal link graph issues detected.")
        else:
            lines.append("Findings:")
            for finding in sorted_findings:
                lines.append(f"- {finding.severity}: {finding.message}")
            lines.append("")

        if out_edges:
            out_rank = sorted(((url, len(targets)) for url, targets in out_edges.items()), key=lambda x: x[1], reverse=True)[:10]
            in_rank = sorted(in_degree.items(), key=lambda x: x[1], reverse=True)[:10]
            depth_rank = sorted(depth.items(), key=lambda x: x[1], reverse=True)[:10]

            lines.append("Top hub pages (outgoing links):")
            for url, score in out_rank:
                lines.append(f"- {url} -> {score}")
            lines.append("")

            lines.append("Top authority pages (incoming links):")
            for url, score in in_rank:
                lines.append(f"- {url} <- {score}")
            lines.append("")

            lines.append("Deepest pages by click depth from home:")
            for url, distance in depth_rank:
                lines.append(f"- depth {distance}: {url}")
            lines.append("")

        self.output_path.write_text("\n".join(lines).strip() + "\n", encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run internal link graph runtime audit")
    parser.add_argument(
        "--base-url",
        default=os.environ.get("SEO_BASE_URL", DEFAULT_BASE_URL),
        help=f"Base URL to audit (default: {DEFAULT_BASE_URL}, or SEO_BASE_URL env).",
    )
    parser.add_argument(
        "--max-urls",
        type=int,
        default=MAX_URLS_DEFAULT,
        help=f"Max sitemap URLs to crawl (default: {MAX_URLS_DEFAULT})",
    )
    parser.add_argument(
        "--output",
        default=DEFAULT_OUTPUT,
        help=f"Output TXT report path (default: {DEFAULT_OUTPUT})",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    auditor = InternalLinkGraphAudit(
        base_url=args.base_url,
        max_urls=max(1, args.max_urls),
        output_path=Path(args.output).resolve(),
    )
    try:
        auditor.run()
        print(f"[+] Link graph audit complete. Report: {auditor.output_path}")
        return 0
    except Exception as exc:
        print(f"[!] Link graph audit failed: {exc}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
