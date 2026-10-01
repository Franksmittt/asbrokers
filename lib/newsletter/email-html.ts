/**
 * Plain HTML email payload for Resend (table-friendly, no react-email dependency).
 */

import type { ResolvedNewsletterEdition } from "./types";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function abs(baseUrl: string, href: string): string {
  if (!href) return baseUrl;
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  return `${baseUrl.replace(/\/$/, "")}${href.startsWith("/") ? href : `/${href}`}`;
}

export function buildNewsletterEmailHtml(
  edition: ResolvedNewsletterEdition,
  baseUrl: string
): string {
  const newsletterUrl = abs(baseUrl, `/newsletter/${edition.date}`);
  const article = edition.articleOfTheWeek;
  const subjectTitle = article.title || "Weekly Financial Freedom Newsletter";

  const articleBlock = article.title
    ? `
      <tr>
        <td style="padding:24px 0;border-bottom:1px solid #e7e5e4;">
          <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#004399;text-transform:uppercase;letter-spacing:0.5px;">Article of the Week</p>
          <h2 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#1D1D1F;">${escapeHtml(article.title)}</h2>
          ${
            article.intro
              ? `<p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#57534e;">${escapeHtml(article.intro)}</p>`
              : ""
          }
          ${
            article.whyItMatters
              ? `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#57534e;"><strong>Why it matters:</strong> ${escapeHtml(article.whyItMatters)}</p>`
              : ""
          }
          ${
            article.articleHref
              ? `<a href="${escapeHtml(abs(baseUrl, article.articleHref))}" style="display:inline-block;padding:10px 20px;background:#004399;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">Read the Full Article →</a>`
              : ""
          }
          ${
            article.relatedCalculator
              ? `<p style="margin:16px 0 0;font-size:13px;"><a href="${escapeHtml(abs(baseUrl, article.relatedCalculator.href))}" style="color:#004399;">${escapeHtml(article.relatedCalculator.label)} →</a></p>`
              : ""
          }
          ${
            article.relatedCourse
              ? `<p style="margin:8px 0 0;font-size:13px;"><a href="${escapeHtml(abs(baseUrl, article.relatedCourse.href))}" style="color:#004399;">${escapeHtml(article.relatedCourse.label)} →</a></p>`
              : ""
          }
        </td>
      </tr>`
    : "";

  const challengeBlock = `
    <tr>
      <td style="padding:24px 0;border-bottom:1px solid #e7e5e4;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#004399;text-transform:uppercase;letter-spacing:0.5px;">104-Week Watch Challenge</p>
        <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#57534e;">
          Financial freedom is more valuable if you have the health to enjoy it. Join the AS Brokers 104-Week Watch Challenge.
        </p>
        <a href="${escapeHtml(abs(baseUrl, edition.watchChallenge.challengeHref || "/financial-freedom-community"))}" style="display:inline-block;padding:10px 20px;background:#004399;color:#fff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">Join the Challenge →</a>
      </td>
    </tr>`;

  const courseRows = edition.courses.availableCourses
    .map(
      (course) => `
        <p style="margin:0 0 10px;font-size:14px;">
          <a href="${escapeHtml(abs(baseUrl, course.href))}" style="color:#004399;font-weight:600;text-decoration:none;">${escapeHtml(course.title)} →</a>
          ${course.description ? `<br/><span style="color:#78716c;font-size:13px;">${escapeHtml(course.description)}</span>` : ""}
        </p>`
    )
    .join("");

  const coursesBlock = courseRows
    ? `
    <tr>
      <td style="padding:24px 0;border-bottom:1px solid #e7e5e4;">
        <p style="margin:0 0 12px;font-size:12px;font-weight:600;color:#004399;text-transform:uppercase;letter-spacing:0.5px;">Clarity Track Courses</p>
        ${courseRows}
      </td>
    </tr>`
    : "";

  const sectionLinks = edition.evergreenSections
    .map(
      (section) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #e7e5e4;"><a href="${escapeHtml(newsletterUrl)}#accordion-header-${section.id}" style="color:#004399;text-decoration:none;font-size:14px;font-weight:500;">${escapeHtml(section.shortTitle)} →</a></td></tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(subjectTitle)}</title>
</head>
<body style="margin:0;padding:0;background:#e7e5e4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e7e5e4;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#F7F6F3;color:#1D1D1F;font-family:system-ui,-apple-system,sans-serif;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="padding:28px 24px 20px;text-align:center;border-bottom:1px solid #e7e5e4;">
              <p style="margin:0 0 4px;font-size:24px;font-weight:700;">AS Brokers</p>
              <p style="margin:0;font-size:14px;color:#78716c;">Create. Protect. Preserve.</p>
              <h1 style="margin:20px 0 8px;font-size:20px;font-weight:700;">Weekly Financial Freedom Newsletter</h1>
              <p style="margin:0;font-size:12px;color:#78716c;">
                ${escapeHtml(
                  new Date(edition.date).toLocaleDateString("en-ZA", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                )}
              </p>
            </td>
          </tr>
          ${articleBlock}
          ${challengeBlock}
          ${coursesBlock}
          <tr>
            <td style="padding:24px 0;border-bottom:1px solid #e7e5e4;">
              <h3 style="margin:0 0 12px;font-size:16px;font-weight:700;">Your Financial Plan</h3>
              <p style="margin:0 0 12px;font-size:14px;color:#57534e;">Open any section on the web edition:</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${sectionLinks}</table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 0;text-align:center;">
              <a href="${escapeHtml(newsletterUrl)}" style="display:inline-block;padding:14px 28px;background:#004399;color:#fff;text-decoration:none;border-radius:8px;font-size:16px;font-weight:600;">Read Full Newsletter</a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 0 8px;border-top:1px solid #e7e5e4;text-align:center;">
              <p style="margin:0 0 4px;font-size:16px;font-weight:700;">AS Brokers CC</p>
              <p style="margin:0 0 8px;font-size:12px;color:#78716c;">FSP 17273 · Create. Protect. Preserve.</p>
              <p style="margin:0 0 12px;font-size:11px;color:#a8a29e;">Educational content only. Not personal financial advice.</p>
              <p style="margin:0;font-size:11px;color:#a8a29e;">
                <a href="${escapeHtml(abs(baseUrl, "/contact"))}" style="color:#78716c;">Contact</a>
                ·
                <a href="${escapeHtml(newsletterUrl)}" style="color:#78716c;">View online</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildNewsletterEmailText(
  edition: ResolvedNewsletterEdition,
  baseUrl: string
): string {
  const newsletterUrl = abs(baseUrl, `/newsletter/${edition.date}`);
  const lines = [
    "AS Brokers — Weekly Financial Freedom Newsletter",
    new Date(edition.date).toLocaleDateString("en-ZA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    "",
  ];
  if (edition.articleOfTheWeek.title) {
    lines.push(`Article of the Week: ${edition.articleOfTheWeek.title}`);
    if (edition.articleOfTheWeek.intro) lines.push(edition.articleOfTheWeek.intro);
    if (edition.articleOfTheWeek.articleHref) {
      lines.push(abs(baseUrl, edition.articleOfTheWeek.articleHref));
    }
    lines.push("");
  }
  lines.push(`Read the full newsletter: ${newsletterUrl}`);
  lines.push("");
  lines.push("AS Brokers CC (FSP 17273). Educational content only. Not personal financial advice.");
  return lines.join("\n");
}

export function defaultNewsletterSubject(edition: ResolvedNewsletterEdition): string {
  if (edition.subjectLine?.trim()) return edition.subjectLine.trim();
  if (edition.articleOfTheWeek.title?.trim()) {
    return `${edition.articleOfTheWeek.title.trim()} | AS Brokers`;
  }
  return "Weekly Financial Freedom Newsletter | AS Brokers";
}
