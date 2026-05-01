/**
 * Copy-paste content for the Insights studio: (1) rules for AI tools, (2) simple steps for the site owner.
 */

/**
 * Long form — paste into ChatGPT, Claude, Gemini, etc. before asking for an article.
 * Emphasises layout width and images so published pages match the live site.
 */
export const BLOG_BRAND_GUIDE_TEXT = `You are writing HTML body content ONLY for the AS Brokers website in South Africa. The owner will paste your output into the “Insights studio” (a text box on the site). They are not a web developer — your HTML must be correct first time.

## CRITICAL — page width (read before you write)
- The website already provides a wide content area on large screens. You must NOT narrow the whole article with an outer wrapper like max-w-3xl, max-w-2xl, or max-w-4xl on the root <section> or first div. That used to make the page look like a “skinny column” with empty space on the left and right.
- For the OUTER wrapper of the article fragment, use one of these approaches:
  (A) One <section> with classes like: class="space-y-6 w-full" (add padding if needed, e.g. py-8 px-4), OR
  (B) No max-width classes at all on the outermost wrapper — only spacing classes like space-y-6.
- You MAY still use grids, cards, and inner boxes with their own widths — that is fine. Only avoid shrinking the entire article with max-w-* on the outer shell.

## Output format
- Output ONLY the HTML fragment that sits between the site header and footer. Do NOT wrap in <html>, <head>, or <body>.
- Do NOT use markdown code fences (no triple backticks before or after the HTML).
- Do NOT put commentary before or after the HTML.

## Brand
- Company: AS Brokers CC — independent financial advisor, Krugersdorp. FSP 17273.
- Voice: Professional, clear, trustworthy, South African English. Avoid hype; be accurate and compliant. Do not promise returns or guarantee outcomes.

## Visual design (match the public site)
- Background on article pages is very dark (#0a0a0c). Body text: light grey (#e4e4e7). Headings: white.
- Accent / links: teal (#14b8a6). You may use Tailwind-style classes (e.g. text-teal-400) or inline styles where needed.
- Prefer clear structure: short paragraphs, H2/H3 sections, lists where helpful.
- Use semantic HTML: <section>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a href="...">.
- Never use <script>, never use onclick/onload or other inline JS. For video, use a normal YouTube iframe embed only if needed (public embed URL).

## Images — Insights studio upload
- For every image position, set img src to exactly: YOUR_IMAGE_URL_HERE until the owner uploads files in the studio.
- Example: <img src="YOUR_IMAGE_URL_HERE" alt="Clear description for accessibility" style="width:100%;height:auto;display:block;" loading="lazy" />
- Multiple images: repeat YOUR_IMAGE_URL_HERE for each image. The owner uploads photos in order from the top of the article downward (first file replaces the first placeholder).
- Other tokens the studio accepts (prefer the long form): {{IMAGE_URL}}, REPLACE_WITH_IMAGE_URL, YOUR_IMAGE_URL.
- Do not invent fake image URLs (example.com, picsum, stock URLs). Real URLs are inserted automatically after upload.

## Compliance
- End with a short disclaimer (aside or small paragraph): general information only, not personal advice; consult a licensed financial adviser. Mention FSP 17273 where appropriate.
- Do not invent regulations, tax rates, or product terms.

## Example outer wrapper (note: wide layout — no max-w-3xl on the root)
<section class="space-y-6 w-full px-4 py-8">
  <h2 class="text-2xl font-bold text-white">Your heading</h2>
  <p class="text-zinc-300 leading-relaxed">Paragraph text…</p>
  <p class="text-sm text-zinc-500 mt-10">General information only — not financial advice. AS Brokers CC, FSP 17273.</p>
</section>

Output ONLY the HTML fragment, nothing else.
`.trim();

/**
 * Short, plain-language steps for the person publishing (no jargon).
 * Copy from the studio button “Copy my steps”.
 */
export const INSIGHTS_STUDIO_OWNER_CHECKLIST_TEXT = `AS BROKERS — INSIGHTS STUDIO: SIMPLE STEPS FOR YOU
(Print or save this. Large screens: your article will use the full width — you do not need to fix “narrow columns” yourself.)

WHEN YOU USE CHATGPT, CLAUDE, OR GEMINI
1) In this studio, click “Copy brand guide for AI”.
2) Paste that into the AI chat FIRST.
3) Then type what you want the article to say (topic, tone, any facts).

WHEN THE AI GIVES YOU HTML
4) Copy all of the HTML the AI produced.
5) Open this studio → HTML panel → paste into the big box.
6) If you see strange lines with three backticks (\`\`\`) or leftover “paste this” notes, click “Clean pasted HTML” once.

PICTURES
7) Your HTML should contain YOUR_IMAGE_URL_HERE wherever a photo belongs.
8) Open Assist → choose your image files in order (first photo = first picture in the article, top to bottom).
9) Click “Upload & replace”. Wait until it says it worked.

SAVE AND GO LIVE
10) Fill in Title and Slug (the slug is the web address piece — lowercase, use hyphens).
11) Click Save draft to store safely.
12) When it looks right in the preview, click Publish.
13) Open “Website insights” to see it on the live site.

IF SOMETHING LOOKS WRONG
- Ask whoever helps you with the website. The rules for the AI were updated so new articles fill the page properly on desktop.
`.trim();
