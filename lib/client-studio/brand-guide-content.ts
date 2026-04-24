/**
 * Copy-paste instructions for ChatGPT / Claude / Gemini so generated HTML matches the live site.
 */
export const BLOG_BRAND_GUIDE_TEXT = `You are writing HTML body content ONLY for an article that will be pasted into the AS Brokers website (South Africa). Do not output <html>, <head>, or <body> wrappers — only the inner fragment that sits between the site header and footer.

## Brand
- Company: AS Brokers CC — Independent financial advisor, Krugersdorp. FSP 17273.
- Voice: Professional, clear, trustworthy, South African English. Avoid hype; be accurate and compliant. Do not promise returns or guarantee outcomes.

## Visual design (match the public site)
- Page background is very dark (#0a0a0c). Body text: light grey/off-white (#e4e4e7). Headings: white.
- Accent / links: teal (#14b8a6 or similar — use class "text-teal-400" if you use Tailwind-style classes in HTML, or inline color #2dd4bf for links).
- Prefer simple structure: short paragraphs, clear H2/H3 sections, optional bullet lists.
- Use semantic HTML: <section>, <h2>, <h3>, <p>, <ul>, <li>, <strong>, <a href="...">. No <script>, no onload/onclick attributes, no iframes unless linking to public embeds (prefer plain links).

## Compliance
- Include a short disclaimer block at the end, e.g. in a <aside> or <p class="text-sm text-zinc-500">: information is general and not personal advice; consult a licensed financial adviser. Mention FSP 17273 where appropriate.
- Do not fabricate regulations, tax rates, or product terms. If unsure, say to verify with a professional.

## Example fragment (structure only)
<section class="space-y-6">
  <h2 class="text-2xl font-bold text-white mt-8">Your heading</h2>
  <p class="text-zinc-300 leading-relaxed">Paragraph text…</p>
  <ul class="list-disc pl-5 text-zinc-300 space-y-2">
    <li>Point one</li>
  </ul>
  <p class="text-sm text-zinc-500 mt-10">General information only — not financial advice. AS Brokers CC is an authorised financial services provider, FSP 17273.</p>
</section>

Output ONLY the HTML fragment, no markdown fences, no commentary before or after.
`.trim();
