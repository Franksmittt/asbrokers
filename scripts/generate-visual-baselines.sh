#!/usr/bin/env bash
# Generate Playwright visual baselines on Linux (required for CI parity).
# Usage: bash scripts/generate-visual-baselines.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE="${PLAYWRIGHT_DOCKER_IMAGE:-mcr.microsoft.com/playwright:v1.49.1-noble}"

docker run --rm -v "${ROOT}:/work" -w /work -e CI=true -e PLAYWRIGHT_PORT=3120 "$IMAGE" \
  bash -lc "npm ci && npm run build && npx playwright install chromium && npx playwright test tests/visual.spec.ts --update-snapshots"

echo "Baselines written under tests/visual.spec.ts-snapshots/ — commit from Linux Docker only."
