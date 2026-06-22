#!/usr/bin/env python3
"""
Run the AS Brokers SEO/AEO audit suite in the recommended order.

Order:
1) Static App Router/code audit
2) Runtime SEO/AEO indexability audit
3) Runtime internal link graph audit

Usage:
  python3 scripts/run-seo-audit-suite.py
  python3 scripts/run-seo-audit-suite.py --base-url http://localhost:3000
"""

from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
from pathlib import Path
from typing import List


DEFAULT_BASE_URL = "https://www.asbrokers.co.za"
DEFAULT_MAX_URLS = 120


def run_step(label: str, command: List[str], cwd: Path) -> int:
    print(f"\n==> {label}")
    print("$ " + " ".join(command))
    completed = subprocess.run(command, cwd=cwd)
    if completed.returncode != 0:
        print(f"[!] {label} failed with exit code {completed.returncode}")
    return completed.returncode


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run AS Brokers SEO/AEO audit suite")
    parser.add_argument(
        "--base-url",
        default=os.environ.get("SEO_BASE_URL", DEFAULT_BASE_URL),
        help=f"Base URL for runtime audits (default: {DEFAULT_BASE_URL}, or SEO_BASE_URL env).",
    )
    parser.add_argument(
        "--max-urls",
        type=int,
        default=DEFAULT_MAX_URLS,
        help=f"Max sitemap URLs for link graph audit (default: {DEFAULT_MAX_URLS}).",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    root = Path(__file__).resolve().parents[1]
    python = sys.executable or "python3"
    max_urls = str(max(1, args.max_urls))

    steps = [
        (
            "Static App Router SEO/AEO audit",
            [python, "scripts/static-seo-aeo-audit.py"],
        ),
        (
            "Runtime indexability and semantics audit",
            [python, "scripts/runtime-seo-aeo-audit.py", "--base-url", args.base_url],
        ),
        (
            "Runtime internal link graph audit",
            [python, "scripts/internal-link-graph-audit.py", "--base-url", args.base_url, "--max-urls", max_urls],
        ),
    ]

    failures = 0
    for label, command in steps:
        code = run_step(label, command, root)
        if code != 0:
            failures += 1

    report_paths = [
        root / "asbrokers_static_seo_aeo_findings.txt",
        root / "asbrokers_runtime_seo_aeo_findings.txt",
        root / "asbrokers_internal_link_graph_audit_findings.txt",
    ]
    finding_failures = 0
    for report_path in report_paths:
        if not report_path.exists():
            print(f"[!] Missing audit report: {report_path.name}")
            finding_failures += 1
            continue
        text = report_path.read_text(encoding="utf-8")
        match = re.search(r"Total findings:\s*(\d+)", text)
        count = int(match.group(1)) if match else -1
        if count != 0:
            print(f"[!] {report_path.name}: {count} finding(s)")
            finding_failures += 1

    if finding_failures:
        failures += finding_failures

    if failures:
        print(f"\n[!] SEO/AEO audit suite completed with {failures} failed step(s).")
        return 1

    print("\n[+] SEO/AEO audit suite complete.")
    print("[+] Reports written to:")
    print("    - asbrokers_static_seo_aeo_findings.txt")
    print("    - asbrokers_runtime_seo_aeo_findings.txt")
    print("    - asbrokers_internal_link_graph_audit_findings.txt")
    return 0


if __name__ == "__main__":
    sys.exit(main())
