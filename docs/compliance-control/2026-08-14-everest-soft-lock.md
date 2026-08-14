# Soft-locked Everest single page (2026-08-14)

`/everest-wealth` is password-gated (default `85879`, override with `EVEREST_SOFT_LOCK_PASSWORD`) and hosts consolidated product copy plus ASSET calculator embeds (009–014 + Amethyst).

Legacy Everest product URLs (`/everest-128-product`, `/immediate-higher-income-calculator`, `/everest-strategic-growth-145`, `/everest-amethyst-living-annuity`, `/everest-wealth/about`) 302 to `/everest-wealth`.

Unlocked sessions set an httpOnly cookie that also allows those Everest embeds under `/embed-calculators/`. Other restricted calculators still 302 to `/calculators`.
