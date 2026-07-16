/**
 * Copy-paste content for the Insights studio: (1) rules for AI tools, (2) simple steps for the site owner.
 * Kept in sync with the Copy-me presets in BlogStudioClient (warm-canvas Insights layout).
 */

/**
 * Long form, paste into ChatGPT, Claude, Gemini, etc. before asking for an article.
 * Emphasises the live light/warm Insights layout (not Studio dark UI).
 */
export const BLOG_BRAND_GUIDE_TEXT = `You are writing HTML body content ONLY for the AS Brokers website in South Africa. The owner will paste your output into Blog Studio. They are not a web developer — your HTML must be correct first time.

## CRITICAL — match the live Insights page
- Published articles sit on a warm canvas (#F7F6F3) with shark headings (#1D1D1F) and stone body text (#52525b). The site already provides a split hero (title, excerpt, photo) and footer.
- Output the ARTICLE BODY only. Do NOT rebuild nav, footer, or a full dark (#050506) page. Dark UI is Studio-only.
- Do NOT narrow the whole article with outer max-w-3xl / max-w-2xl / max-w-4xl. Use space-y-6 / w-full (padding ok).
- Links: #0057B8. Kickers / accents: #006B6B. Borders: #E5E5E5. Soft cards: white with hairline border, ~15px radius on images.

## Output format
- Output ONLY the HTML fragment. No <html>/<head>/<body>. No markdown fences. No commentary.

## Brand
- Company: AS Brokers CC, independent financial adviser, Krugersdorp. FSP 17273.
- Voice: Professional, clear, trustworthy, South African English. No hype; no guaranteed or fixed-return claims.

## Structure
- Semantic HTML: <section>, <h2>, <h3>, <p>, <ul>, <li>, <aside>, <blockquote>, <a>.
- Prefer flowing editorial sections; cards only for checklists, warnings, or calculator/video intros.
- Calculator exception: if asked to include a calculator, leave the exact studio placeholder token (do not invent embed scripts unless the owner pastes a Calculator code library snippet).

## Images
- Use the studio image placeholder tokens the owner requested (e.g. [IMAGE_SLOT] or YOUR_IMAGE_URL_HERE). Do not invent stock URLs.

## Compliance
- End with a short educational disclaimer (not personal advice; FSP 17273). Do not invent tax rates or product terms.

## Example outer wrapper (wide, light editorial)
<section class="space-y-6 w-full">
  <h2 style="color:#1D1D1F;font-size:1.75rem;letter-spacing:-0.02em;">Your heading</h2>
  <p style="color:#52525b;line-height:1.8;">Paragraph text…</p>
  <p style="color:#71717a;font-size:0.875rem;margin-top:2.5rem;">General information only, not financial advice. AS Brokers CC, FSP 17273.</p>
</section>

Output ONLY the HTML fragment, nothing else.
`.trim();

/**
 * Short, plain-language steps for the person publishing (no jargon).
 */
export const INSIGHTS_STUDIO_OWNER_CHECKLIST_TEXT = `AS BROKERS — BLOG STUDIO: SIMPLE STEPS FOR YOU

WHEN YOU USE CHATGPT, CLAUDE, OR GEMINI
1) In Workspace, open Brand guide (sidebar) or scroll to “Copy the brand guide”.
2) Choose a preset and click Copy prompt. Paste that into AI FIRST.
3) Then type the article topic and any facts.

WHEN THE AI GIVES YOU HTML
4) Copy the HTML (no triple backticks).
5) Paste into Step 1: Paste AI Blog Code.
6) Upload images / assign calculator or video slots if requested.
7) Fill title, slug, excerpt, and categories. Save draft.

SAVE AND GO LIVE
8) Check Live Reading Preview (warm canvas, like the public site).
9) When readiness is READY, click Publish.
10) Unfinished work lives under Drafts in the sidebar.

IF SOMETHING LOOKS WRONG
- Re-copy the brand guide — articles must look light/warm on Insights, not dark like Studio.
`.trim();
