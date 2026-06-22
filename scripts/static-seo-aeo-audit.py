#!/usr/bin/env python3
"""
Next.js App Router static SEO/AEO audit engine for AS Brokers.

Scans the codebase for high-impact SEO and Answer Engine Optimization risks
inspired by a Next.js SEO audit blueprint.

Usage:
  python3 scripts/static-seo-aeo-audit.py
  python3 scripts/static-seo-aeo-audit.py --app-dir app

Outputs a plaintext report to the repository root by default:
  asbrokers_static_seo_aeo_findings.txt
"""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List


SOURCE_EXTENSIONS = {".ts", ".tsx", ".js", ".jsx"}
CANONICAL_HOST = "www.asbrokers.co.za"
DEFAULT_OUTPUT = "asbrokers_static_seo_aeo_findings.txt"

# Routes intentionally noindexed/private in this project.
INTENTIONAL_NOINDEX_PREFIXES: tuple[str, ...] = (
    "app/studio/",
    "app/internal/",
    "app/crm/",
    "app/portal/",
    "/report/[",
    "/checklist/[",
)

NON_PUBLIC_ROUTE_PREFIXES: tuple[str, ...] = (
    "app/studio/",
    "app/internal/",
    "app/crm/",
    "app/portal/",
    "app/login/",
    "app/embed/",
)

DYNAMIC_ROUTE_IGNORED_MARKERS: tuple[str, ...] = (
    "/api/",
    "/embed/",
    "/report/[",
    "/checklist/[",
    "/studio/",
    "/insights/[slug]/",
)


@dataclass
class Finding:
    severity: str
    message: str


class NextSeoAeoAuditor:
    def __init__(self, root: Path, app_dir: str) -> None:
        self.root = root
        self.app_dir = app_dir
        self.app_path = root / app_dir
        self.findings: Dict[str, List[Finding]] = {}

    def add(self, rel_path: str, severity: str, message: str) -> None:
        if rel_path not in self.findings:
            self.findings[rel_path] = []
        self.findings[rel_path].append(Finding(severity=severity, message=message))

    def read_text(self, path: Path) -> str:
        try:
            return path.read_text(encoding="utf-8")
        except Exception as exc:  # pragma: no cover
            rel = self._rel(path)
            self.add(rel, "HIGH", f"Could not read file: {exc}")
            return ""

    def _rel(self, path: Path) -> str:
        return str(path.relative_to(self.root)).replace("\\", "/")

    def _is_non_public_route(self, rel: str) -> bool:
        normalized = rel.replace("\\", "/")
        return any(normalized.startswith(prefix) for prefix in NON_PUBLIC_ROUTE_PREFIXES)

    def run(self) -> None:
        if not self.app_path.exists():
            raise FileNotFoundError(f"App directory not found: {self.app_path}")

        self._audit_platform_artifacts()
        self._audit_next_config()
        self._audit_root_layout()
        self._audit_middleware()

        for file_path in self.app_path.rglob("*"):
            if file_path.is_file() and file_path.suffix in SOURCE_EXTENSIONS:
                self._audit_file(file_path)

    def _app_rel(self, path: str) -> str:
        return f"{self.app_dir.strip('/')}/{path.lstrip('/')}"

    def _audit_platform_artifacts(self) -> None:
        robots_path = self.app_path / "robots.ts"
        sitemap_path = self.app_path / "sitemap.ts"

        if not robots_path.exists():
            self.add(self._app_rel("robots.ts"), "HIGH", "Missing robots metadata file.")
        else:
            robots = self.read_text(robots_path)
            if "sitemap" not in robots:
                self.add(self._rel(robots_path), "MEDIUM", "robots.ts does not advertise sitemap.")
            if 'allow: "/"' in robots and 'disallow: ["/api/"]' in robots:
                pass
            elif re.search(
                r"userAgent:\s*['\"]\*['\"][\s\S]*?disallow:\s*['\"]/\s*['\"]",
                robots,
            ):
                self.add(self._rel(robots_path), "HIGH", "robots.ts appears to disallow full site crawl.")

        if not sitemap_path.exists():
            self.add(self._app_rel("sitemap.ts"), "HIGH", "Missing sitemap metadata file.")
        else:
            sitemap = self.read_text(sitemap_path)
            if not any(token in sitemap for token in ("baseUrl", "absoluteUrl", "getSiteOrigin", "siteUrl")):
                self.add(self._rel(sitemap_path), "MEDIUM", "sitemap.ts missing base URL handling.")
            if "https://" not in sitemap and "absoluteUrl" not in sitemap and "getSiteOrigin" not in sitemap:
                self.add(self._rel(sitemap_path), "MEDIUM", "sitemap.ts does not show explicit https URL handling.")

        llms_public = self.root / "public" / "llms.txt"
        if not llms_public.exists():
            self.add("public/llms.txt", "MEDIUM", "Missing public/llms.txt for LLM crawler discovery.")

    def _audit_next_config(self) -> None:
        candidates = [self.root / "next.config.mjs", self.root / "next.config.js", self.root / "next.config.ts"]
        config_path = next((p for p in candidates if p.exists()), None)
        if not config_path:
            self.add("next.config.mjs", "MEDIUM", "next.config file missing; cannot validate redirect/crawl guards.")
            return

        content = self.read_text(config_path)
        rel = self._rel(config_path)

        # Known crawl-killer pattern: redirecting _rsc query can trigger looping fetch paths.
        if re.search(r"has:\s*\[\s*\{\s*type:\s*['\"]query['\"],\s*key:\s*['_\"]_rsc", content):
            self.add(rel, "HIGH", "Detected _rsc query redirect rule; this can create redirect loops.")

        if "host" not in content or CANONICAL_HOST not in content:
            self.add(rel, "LOW", f"No explicit host canonical redirect found for {CANONICAL_HOST}.")

    def _audit_middleware(self) -> None:
        candidates = [self.root / "middleware.ts", self.root / "middleware.js"]
        middleware_path = next((p for p in candidates if p.exists()), None)
        if not middleware_path:
            return

        content = self.read_text(middleware_path)
        rel = self._rel(middleware_path)
        if re.search(r"X-Robots-Tag", content):
            if "isPrivateRoute" not in content:
                self.add(rel, "MEDIUM", "Middleware sets noindex; verify public content is excluded from that header.")

    def _audit_root_layout(self) -> None:
        candidates = [self.app_path / "layout.tsx", self.app_path / "layout.ts", self.app_path / "layout.js"]
        root_layout = next((p for p in candidates if p.exists()), None)

        if not root_layout:
            self.add(self._app_rel("layout.tsx"), "HIGH", "Root layout missing. Metadata inheritance chain is broken.")
            return

        rel = self._rel(root_layout)
        content = self.read_text(root_layout)

        if not re.search(r"metadataBase\s*:\s*new\s+URL\(", content):
            self.add(rel, "HIGH", "Missing metadataBase; canonical URL resolution can break in production.")
        else:
            if CANONICAL_HOST not in content and "getSiteOrigin" not in content:
                self.add(rel, "LOW", f"metadataBase does not visibly enforce canonical host {CANONICAL_HOST}.")

        project_text = content
        for rel_path in (
            "components/Providers.tsx",
            "components/analytics/ConditionalAnalytics.tsx",
            "components/analytics/ConsentProvider.tsx",
        ):
            path = self.root / rel_path
            if path.exists():
                project_text += "\n" + self.read_text(path)

        has_third_parties_lib = "@next/third-parties/google" in project_text
        has_gtm_component = "GoogleTagManager" in project_text
        has_ga_component = "GoogleAnalytics" in project_text

        # Project can use next/script safely, but flag if there is no GA/GTM integration path.
        if not (has_third_parties_lib and (has_gtm_component or has_ga_component)) and "next/script" not in project_text:
            self.add(rel, "MEDIUM", "No clear GA/GTM integration detected (next/script or @next/third-parties/google).")

    def _audit_file(self, file_path: Path) -> None:
        rel = self._rel(file_path)
        content = self.read_text(file_path)
        stripped = content.strip()
        is_client = bool(re.match(r"^[\"']use client[\"'];?", stripped))
        name = file_path.name
        is_page = name.startswith("page.")

        if is_client and re.search(r"useEffect\s*\(", content) and re.search(r"(fetch\s*\(|axios\.|useQuery\s*\()", content):
            self.add(
                rel,
                "HIGH",
                "Client component fetch in useEffect may hide content from crawlers. Prefer server-side data fetching.",
            )

        dynamic_route_ignored = any(marker in rel for marker in DYNAMIC_ROUTE_IGNORED_MARKERS)
        if is_page and "[" in rel and "]" in rel and "generateStaticParams" not in content and not dynamic_route_ignored:
            self.add(rel, "MEDIUM", "Dynamic route missing generateStaticParams; may hurt crawl efficiency/TTFB.")

        if is_page and re.search(r"<head\b", content):
            self.add(rel, "HIGH", "Hardcoded <head> tag detected; use Metadata API in App Router.")

        if is_page and not self._is_non_public_route(rel):
            self._check_page_metadata_presence(file_path, rel, content)
            self._check_noindex_directives(rel, content)
            self._check_internal_link_hygiene(rel, content)

        self._check_image_alt(rel, content)
        self._check_jsonld(rel, is_page, is_client, content)
        self._check_h1(rel, is_page and not self._is_non_public_route(rel), content)

    def _has_layout_metadata_in_scope(self, page_path: Path) -> bool:
        for parent in [page_path.parent, *page_path.parents]:
            if parent == self.root:
                break
            if not str(parent).startswith(str(self.app_path)):
                continue
            for layout_name in ("layout.tsx", "layout.ts", "layout.js"):
                layout_path = parent / layout_name
                if layout_path.exists():
                    layout_content = self.read_text(layout_path)
                    if "export const metadata" in layout_content or "generateMetadata" in layout_content:
                        return True
        return False

    def _check_page_metadata_presence(self, page_path: Path, rel: str, content: str) -> None:
        has_page_metadata = "export const metadata" in content or "generateMetadata" in content
        if has_page_metadata:
            return
        if self._has_layout_metadata_in_scope(page_path):
            return
        self.add(rel, "MEDIUM", "Route page has no metadata export and no layout metadata in scope.")

    def _check_image_alt(self, rel: str, content: str) -> None:
        for match in re.finditer(r"<Image\s+([^>]+?)(/?>)", content, flags=re.DOTALL):
            attrs = match.group(1)
            if "alt=" not in attrs:
                self.add(rel, "HIGH", "Next/Image missing alt attribute.")
            elif re.search(r"alt\s*=\s*([\"'])\1", attrs) or re.search(r"alt\s*=\s*\{\s*([\"'])\1\s*\}", attrs):
                self.add(rel, "MEDIUM", "Next/Image has empty alt text.")

    def _check_jsonld(self, rel: str, is_page: bool, is_client: bool, content: str) -> None:
        if not is_page or is_client:
            return

        has_jsonld = "application/ld+json" in content or "schema-dts" in content
        if has_jsonld and "JSON.stringify" in content and "replace(/</g" not in content and ".replace(/</g" not in content:
            self.add(rel, "HIGH", "JSON-LD appears unsanitized; add .replace(/</g, '\\u003c').")

    def _check_h1(self, rel: str, is_page: bool, content: str) -> None:
        if not is_page:
            return
        if "<h1" in content:
            return
        # Wrapper pages that delegate to imported components often place h1 in child sections.
        if (
            "PageHero" in content
            or "AgencyHeroSection" in content
            or "HeroSection" in content
            or "LegacyReadinessLanding" in content
            or "HealthyRetirementBlueprint" in content
            or "RetirementSurvivalBlueprint" in content
            or "BusinessRiskReviewTool" in content
            or "BusinessRiskReportView" in content
            or "HealthyRetirementReport" in content
            or "LegacyChecklistDocument" in content
            or "from '@/components/layout/page-ui'" in content
        ):
            return
        if re.search(r"return\s*<\w+", content):
            return
        if "return" in content:
            self.add(rel, "MEDIUM", "No <h1> detected in page component.")

    def _check_noindex_directives(self, rel: str, content: str) -> None:
        normalized_rel = rel.replace("\\", "/")
        if any(normalized_rel.startswith(prefix) for prefix in INTENTIONAL_NOINDEX_PREFIXES):
            return
        if "/report/" in normalized_rel or "/checklist/" in normalized_rel:
            return
        if re.search(r"robots\s*:\s*\{[^}]*index\s*:\s*false", content, flags=re.DOTALL):
            self.add(rel, "MEDIUM", "robots.index is false; page is configured as noindex.")
        if re.search(r"['\"]noindex['\"]", content):
            self.add(rel, "LOW", "Found explicit noindex token; verify intentional.")

    def _check_internal_link_hygiene(self, rel: str, content: str) -> None:
        # Catch obviously broken href placeholders on route pages.
        for href in re.findall(r"href\s*=\s*[\"']([^\"']+)[\"']", content):
            if href in {"#", "javascript:void(0)", "javascript:;"}:
                self.add(rel, "LOW", f"Placeholder href found: {href}")

    def write_report(self, output_path: Path) -> None:
        severity_order = {"HIGH": 0, "MEDIUM": 1, "LOW": 2}

        total = sum(len(v) for v in self.findings.values())
        high = sum(1 for fs in self.findings.values() for f in fs if f.severity == "HIGH")
        med = sum(1 for fs in self.findings.values() for f in fs if f.severity == "MEDIUM")
        low = sum(1 for fs in self.findings.values() for f in fs if f.severity == "LOW")

        lines: List[str] = []
        lines.append("NEXT.JS STATIC SEO/AEO AUDIT FINDINGS")
        lines.append("=" * 41)
        lines.append(f"Root: {self.root}")
        lines.append(f"App dir: {self.app_path}")
        lines.append("")
        lines.append(f"Total findings: {total}")
        lines.append(f"HIGH: {high} | MEDIUM: {med} | LOW: {low}")
        lines.append("")

        if total == 0:
            lines.append("No structural SEO/AEO findings detected by the static auditor.")
        else:
            for file_path in sorted(self.findings.keys()):
                lines.append(f"[{file_path}]")
                sorted_findings = sorted(self.findings[file_path], key=lambda x: severity_order[x.severity])
                for finding in sorted_findings:
                    lines.append(f"- {finding.severity}: {finding.message}")
                lines.append("")

        output_path.write_text("\n".join(lines).strip() + "\n", encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run Next.js SEO/AEO static audit")
    parser.add_argument(
        "--root",
        default=".",
        help="Project root path (default: current directory)",
    )
    parser.add_argument(
        "--app-dir",
        default="app",
        help="App Router directory relative to root (default: app)",
    )
    parser.add_argument(
        "--output",
        default=DEFAULT_OUTPUT,
        help=f"Output report path relative to root (default: {DEFAULT_OUTPUT})",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()
    auditor = NextSeoAeoAuditor(root=root, app_dir=args.app_dir)

    try:
        auditor.run()
        out_path = root / args.output
        auditor.write_report(out_path)
        print(f"[+] Audit complete. Report written to: {out_path}")
        return 0
    except Exception as exc:
        print(f"[!] Audit failed: {exc}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
