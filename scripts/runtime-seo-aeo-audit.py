#!/usr/bin/env python3
"""
Next.js runtime SEO/AEO audit for AS Brokers.

Live verification layer for:
- robots/sitemap/llms availability
- bot accessibility (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot)
- redirect-chain hygiene
- canonical parity
- noindex / x-robots-tag checks
- JSON-LD presence

Usage:
  python3 scripts/runtime-seo-aeo-audit.py
  python3 scripts/runtime-seo-aeo-audit.py --base-url http://localhost:3000

Outputs plaintext findings to the project root by default:
  asbrokers_runtime_seo_aeo_findings.txt
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Tuple


DEFAULT_BASE_URL = "https://www.asbrokers.co.za"
DEFAULT_OUTPUT = "asbrokers_runtime_seo_aeo_findings.txt"

USER_AGENTS = {
    "Googlebot": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Bingbot": "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
    "GPTBot": "Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)",
    "ClaudeBot": "Mozilla/5.0 (compatible; ClaudeBot/1.0; +https://anthropic.com/claudebot)",
    "PerplexityBot": "Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/bot)",
}

HTML_EXT_BLOCKLIST = (".xml", ".txt", ".kml", ".json", ".pdf")
ARTICLE_PATH_MARKERS = ("/insights/", "/blog/")
MAX_SITEMAP_URLS = 200
MAX_REDIRECT_HOPS = 5
REQUEST_TIMEOUT = 20


@dataclass
class Finding:
    severity: str
    target: str
    message: str


class RuntimeAuditor:
    def __init__(self, base_url: str, output_path: Path) -> None:
        self.base_url = base_url.rstrip("/")
        self.output_path = output_path
        self.findings: List[Finding] = []

    def add(self, severity: str, target: str, message: str) -> None:
        self.findings.append(Finding(severity=severity, target=target, message=message))

    def _request(
        self,
        url: str,
        user_agent: Optional[str] = None,
        method: str = "GET",
        follow_redirects: bool = True,
    ) -> Tuple[int, str, Dict[str, str], str]:
        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        }
        if user_agent:
            headers["User-Agent"] = user_agent

        req = urllib.request.Request(url, headers=headers, method=method)

        opener = urllib.request.build_opener()
        if not follow_redirects:
            opener = urllib.request.build_opener(_NoRedirectHandler())

        try:
            with opener.open(req, timeout=REQUEST_TIMEOUT) as resp:
                final_url = resp.geturl()
                status = resp.getcode()
                raw_headers = {k.lower(): v for k, v in resp.headers.items()}
                content_type = raw_headers.get("content-type", "")
                body_bytes = resp.read()
                body = ""
                if "text" in content_type or "json" in content_type or "xml" in content_type:
                    body = body_bytes.decode("utf-8", errors="replace")
                return status, final_url, raw_headers, body
        except urllib.error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace") if exc.fp else ""
            headers_map = {k.lower(): v for k, v in (exc.headers.items() if exc.headers else [])}
            return exc.code, url, headers_map, body
        except Exception as exc:
            self.add("HIGH", url, f"Network request failed: {exc}")
            return 0, url, {}, ""

    def _normalize_url(self, url: str) -> str:
        parsed = urllib.parse.urlparse(url)
        scheme = parsed.scheme.lower() or "https"
        netloc = parsed.netloc.lower()
        path = parsed.path or "/"
        if path != "/" and path.endswith("/"):
            path = path[:-1]
        return f"{scheme}://{netloc}{path}"

    def _normalize_for_compare(self, url: str, path_only: bool = False) -> str:
        parsed = urllib.parse.urlparse(url)
        path = parsed.path or "/"
        if path != "/" and path.endswith("/"):
            path = path[:-1]
        if path_only:
            return path
        host = parsed.netloc.lower().replace("www.", "")
        return f"{host}{path}"

    def _is_html_url(self, url: str) -> bool:
        parsed = urllib.parse.urlparse(url)
        path = parsed.path.lower()
        return not any(path.endswith(ext) for ext in HTML_EXT_BLOCKLIST)

    def _is_local_mode(self) -> bool:
        host = urllib.parse.urlparse(self.base_url).hostname
        return host in {"localhost", "127.0.0.1"}

    def _remap_to_base(self, url: str) -> str:
        """
        When auditing localhost, sitemap loc values may still be production URLs.
        Remap them to the supplied base host so runtime checks stay local.
        """
        if not self._is_local_mode():
            return url
        base = urllib.parse.urlparse(self.base_url)
        parsed = urllib.parse.urlparse(url)
        path = parsed.path or "/"
        return f"{base.scheme}://{base.netloc}{path}"

    def _extract_canonical(self, html: str) -> Optional[str]:
        match = re.search(
            r'<link[^>]+rel=["\']canonical["\'][^>]*href=["\']([^"\']+)["\']',
            html,
            flags=re.IGNORECASE,
        )
        if match:
            return match.group(1).strip()

        # Some renderers emit href before rel.
        match = re.search(
            r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\']canonical["\']',
            html,
            flags=re.IGNORECASE,
        )
        return match.group(1).strip() if match else None

    def _extract_jsonld_blocks(self, html: str) -> List[str]:
        pattern = re.compile(
            r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
            flags=re.IGNORECASE | re.DOTALL,
        )
        return [m.strip() for m in pattern.findall(html) if m.strip()]

    def _extract_html_links(self, html: str) -> List[str]:
        return re.findall(r'href=["\']([^"\']+)["\']', html, flags=re.IGNORECASE)

    def audit_platform_files(self) -> List[str]:
        sitemap_urls: List[str] = []

        # robots.txt
        robots_url = f"{self.base_url}/robots.txt"
        status, _, _, robots_body = self._request(robots_url)
        if status != 200:
            self.add("HIGH", robots_url, f"robots.txt not reachable (status {status}).")
        else:
            if "sitemap" not in robots_body.lower():
                self.add("MEDIUM", robots_url, "robots.txt missing sitemap declaration.")

        # sitemap.xml
        sitemap_url = f"{self.base_url}/sitemap.xml"
        status, _, _, sitemap_body = self._request(sitemap_url)
        if status != 200:
            self.add("HIGH", sitemap_url, f"sitemap.xml not reachable (status {status}).")
        else:
            try:
                ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
                root = ET.fromstring(sitemap_body)
                nodes = root.findall(".//sm:url/sm:loc", ns)
                if not nodes:
                    nodes = root.findall(".//url/loc")
                sitemap_urls = [
                    self._remap_to_base(n.text.strip())
                    for n in nodes
                    if n.text and n.text.strip()
                ]
                if not sitemap_urls:
                    self.add("HIGH", sitemap_url, "sitemap.xml parsed but contains zero URLs.")
            except Exception as exc:
                self.add("HIGH", sitemap_url, f"Failed to parse sitemap.xml: {exc}")

        # llms.txt
        llms_url = f"{self.base_url}/llms.txt"
        status, _, _, llms_body = self._request(llms_url)
        if status != 200:
            self.add("MEDIUM", llms_url, f"llms.txt not reachable (status {status}).")
        else:
            lower = llms_body.lower()
            if "core services" not in lower:
                self.add("LOW", llms_url, "llms.txt missing 'Core Services' section.")
            if "/sitemap.xml" not in lower:
                self.add("LOW", llms_url, "llms.txt does not mention sitemap.xml.")
            if "/llms-full.txt" not in lower:
                self.add("LOW", llms_url, "llms.txt does not mention llms-full.txt.")

        # llms-full.txt
        llms_full_url = f"{self.base_url}/llms-full.txt"
        status, _, _, llms_full_body = self._request(llms_full_url)
        if status != 200:
            self.add("MEDIUM", llms_full_url, f"llms-full.txt not reachable (status {status}).")
        else:
            lower = llms_full_body.lower()
            if "fsp 17273" not in lower:
                self.add("LOW", llms_full_url, "llms-full.txt missing FSP 17273 disclosure.")
            if "targeted" not in lower or "guaranteed" not in lower:
                self.add("LOW", llms_full_url, "llms-full.txt should clarify targeted returns vs guaranteed outcomes.")
            if "/sitemap.xml" not in lower:
                self.add("LOW", llms_full_url, "llms-full.txt does not mention sitemap.xml.")

        return sitemap_urls[:MAX_SITEMAP_URLS]

    def audit_bot_access(self, sample_urls: List[str]) -> None:
        checks = [self.base_url] + [u for u in sample_urls if self._is_html_url(u)][:5]
        for url in checks:
            for bot_name, ua in USER_AGENTS.items():
                status, final_url, headers, body = self._request(url, user_agent=ua, method="GET")
                if status == 0:
                    continue
                if status >= 400:
                    self.add("HIGH", f"{bot_name} -> {url}", f"Returned status {status}.")
                if "captcha" in body.lower():
                    self.add("HIGH", f"{bot_name} -> {url}", "CAPTCHA-like response detected.")
                x_robots = headers.get("x-robots-tag", "").lower()
                if "noindex" in x_robots:
                    self.add("HIGH", f"{bot_name} -> {url}", "x-robots-tag contains noindex.")
                if self._normalize_url(final_url) != self._normalize_url(url):
                    # Normal for www enforcement, so only flag if domain changed unexpectedly.
                    in_domain = urllib.parse.urlparse(self.base_url).netloc
                    allowed_hosts = {in_domain, f"www.{in_domain}", in_domain.replace("www.", "")}
                    if urllib.parse.urlparse(final_url).netloc not in allowed_hosts:
                        self.add("MEDIUM", f"{bot_name} -> {url}", f"Redirected to unexpected host: {final_url}")

    def audit_redirect_chain(self, urls: List[str]) -> None:
        for url in urls:
            if not self._is_html_url(url):
                continue
            current = url
            hops = 0
            while hops <= MAX_REDIRECT_HOPS:
                status, _, headers, _ = self._request(current, follow_redirects=False)
                if status in {301, 302, 307, 308}:
                    location = headers.get("location")
                    if not location:
                        self.add("MEDIUM", url, f"Redirect ({status}) missing Location header.")
                        break
                    next_url = urllib.parse.urljoin(current, location)
                    hops += 1
                    if self._normalize_url(next_url) == self._normalize_url(current):
                        self.add("HIGH", url, "Self-redirect detected (possible loop).")
                        break
                    current = next_url
                    continue
                if status >= 400:
                    self.add("MEDIUM", url, f"Final URL status {status}.")
                break
            if hops > MAX_REDIRECT_HOPS:
                self.add("HIGH", url, f"Redirect chain exceeded {MAX_REDIRECT_HOPS} hops.")

    def audit_page_indexability_and_semantics(self, urls: List[str]) -> None:
        path_only = self._is_local_mode()
        for url in urls:
            if not self._is_html_url(url):
                continue
            status, final_url, headers, body = self._request(url)
            if status != 200:
                self.add("MEDIUM", url, f"Page status {status} (expected 200).")
                continue

            # noindex checks
            if re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\'][^"\']*noindex', body, re.IGNORECASE):
                self.add("HIGH", url, "Meta robots contains noindex.")
            if "noindex" in headers.get("x-robots-tag", "").lower():
                self.add("HIGH", url, "x-robots-tag contains noindex.")

            # canonical checks
            canonical = self._extract_canonical(body)
            if not canonical:
                self.add("MEDIUM", url, "Canonical link tag missing.")
            else:
                canonical_abs = urllib.parse.urljoin(final_url, canonical)
                if self._normalize_for_compare(canonical_abs, path_only) != self._normalize_for_compare(
                    final_url, path_only
                ):
                    self.add(
                        "MEDIUM",
                        url,
                        "Canonical mismatch. "
                        f"page={self._normalize_for_compare(final_url, path_only)} "
                        f"canonical={self._normalize_for_compare(canonical_abs, path_only)}",
                    )

            # JSON-LD checks
            blocks = self._extract_jsonld_blocks(body)
            if not blocks:
                self.add("LOW", url, "No JSON-LD script blocks detected.")
            else:
                parseable = 0
                for block in blocks:
                    try:
                        json.loads(block)
                        parseable += 1
                    except Exception:
                        pass
                if parseable == 0:
                    self.add("LOW", url, "JSON-LD present but no blocks parsed as valid JSON.")

            # Internal link hygiene (basic)
            hrefs = self._extract_html_links(body)
            bad_hrefs = [h for h in hrefs if h in {"#", "javascript:void(0)", "javascript:;"}]
            if bad_hrefs:
                self.add("LOW", url, f"Placeholder links found ({len(bad_hrefs)}).")

    def run(self) -> None:
        sitemap_urls = self.audit_platform_files()
        sample_urls = sitemap_urls[:30] if sitemap_urls else [self.base_url]
        article_urls = [
            u
            for u in sitemap_urls
            if any(marker in u for marker in ARTICLE_PATH_MARKERS)
            and self._normalize_url(u) not in {self._normalize_url(f"{self.base_url}/insights"), self._normalize_url(f"{self.base_url}/blog")}
        ]
        self.audit_bot_access(sample_urls)
        self.audit_redirect_chain(sample_urls[:20])
        semantic_urls = list(dict.fromkeys([*sample_urls[:20], *article_urls]))
        self.audit_page_indexability_and_semantics(semantic_urls)
        self.write_report()

    def write_report(self) -> None:
        order = {"HIGH": 0, "MEDIUM": 1, "LOW": 2}
        sorted_findings = sorted(self.findings, key=lambda f: (order[f.severity], f.target))

        high = sum(1 for f in sorted_findings if f.severity == "HIGH")
        med = sum(1 for f in sorted_findings if f.severity == "MEDIUM")
        low = sum(1 for f in sorted_findings if f.severity == "LOW")

        lines: List[str] = []
        lines.append("NEXT.JS RUNTIME SEO/AEO AUDIT FINDINGS")
        lines.append("=" * 38)
        lines.append(f"Base URL: {self.base_url}")
        lines.append("")
        lines.append(f"Total findings: {len(sorted_findings)}")
        lines.append(f"HIGH: {high} | MEDIUM: {med} | LOW: {low}")
        lines.append("")

        if not sorted_findings:
            lines.append("No runtime SEO/AEO findings detected.")
        else:
            for finding in sorted_findings:
                lines.append(f"- {finding.severity} [{finding.target}] {finding.message}")

        self.output_path.write_text("\n".join(lines).strip() + "\n", encoding="utf-8")


class _NoRedirectHandler(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run runtime Next.js SEO/AEO audit")
    parser.add_argument(
        "--base-url",
        default=os.environ.get("SEO_BASE_URL", DEFAULT_BASE_URL),
        help=f"Base URL to audit (default: {DEFAULT_BASE_URL}, or SEO_BASE_URL env).",
    )
    parser.add_argument(
        "--output",
        default=DEFAULT_OUTPUT,
        help="Output TXT report path relative to current working directory.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    output = Path(args.output).resolve()
    auditor = RuntimeAuditor(base_url=args.base_url, output_path=output)

    try:
        auditor.run()
        print(f"[+] Runtime audit complete. Report written to: {output}")
        return 0
    except Exception as exc:
        print(f"[!] Runtime audit failed: {exc}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
