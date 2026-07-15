import assert from "node:assert/strict";
import {
  hardenCalculatorIframesForPreview,
  recoverCalculatorSlotsFromHtml,
} from "../lib/client-studio/calculator-preview";
import {
  extractStudioBodyMetadata,
  withEmbeddedStudioBodyMetadata,
} from "../lib/client-studio/studio-body-metadata";

const rawHtmlWithCssBraces = `<section><style>.hero{color:#fff}</style><p>Plan</p>[CALCULATOR_SLOT]</section>`;
const resolved =
  '<div><iframe src="/embed-calculators/asset-002-retirement-reality-check.html" title="AS Brokers Retirement Reality Check Calculator" loading="lazy" style="display:block;width:100%;min-height:640px;border:0;"></iframe></div>';

const withMeta = withEmbeddedStudioBodyMetadata(resolved, {
  rawHtml: rawHtmlWithCssBraces,
  calcSelection: { "0": "asset-002-retirement-reality-check" },
});

const parsed = extractStudioBodyMetadata(withMeta);
assert.equal(parsed.metadata?.calcSelection?.["0"], "asset-002-retirement-reality-check");
assert.equal(parsed.metadata?.rawHtml, rawHtmlWithCssBraces);
assert.ok(!parsed.cleanHtml.includes("studio_meta"));

const recovered = recoverCalculatorSlotsFromHtml(resolved);
assert.equal(recovered.html.includes("[CALCULATOR_SLOT]"), true);
assert.equal(recovered.calcSelection[0], "asset-002-retirement-reality-check");

const hardened = hardenCalculatorIframesForPreview(resolved, "https://www.asbrokers.co.za");
assert.match(
  hardened,
  /src="https:\/\/www\.asbrokers\.co\.za\/embed-calculators\/asset-002-retirement-reality-check\.html"/
);
assert.match(hardened, /loading="eager"/);
assert.match(hardened, /data-asb-calculator-embed="true"/);

console.log("studio-calculator-draft-load: ok");
