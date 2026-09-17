/**
 * Email-friendly teaser version of the newsletter.
 * This generates static HTML suitable for embedding in email clients.
 * Interactive accordions are replaced with static teasers linking to the web version.
 */

import type { ResolvedNewsletterEdition } from "@/lib/newsletter/types";

interface NewsletterEmailTeaserProps {
  edition: ResolvedNewsletterEdition;
  baseUrl: string;
}

export function NewsletterEmailTeaser({ edition, baseUrl }: NewsletterEmailTeaserProps) {
  const newsletterUrl = `${baseUrl}/newsletter/${edition.date}`;

  return (
    <div
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "24px",
        backgroundColor: "#F7F6F3",
        color: "#1D1D1F",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", paddingBottom: "24px", borderBottom: "1px solid #e7e5e4" }}>
        <h1 style={{ margin: "0 0 4px", fontSize: "24px", fontWeight: "bold" }}>AS Brokers</h1>
        <p style={{ margin: "0", fontSize: "14px", color: "#78716c" }}>Create. Protect. Preserve.</p>
        <h2 style={{ margin: "24px 0 8px", fontSize: "20px", fontWeight: "bold" }}>
          Weekly Financial Freedom Newsletter
        </h2>
        <p style={{ margin: "0", fontSize: "12px", color: "#78716c" }}>
          {new Date(edition.date).toLocaleDateString("en-ZA", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Article of the Week */}
      {edition.articleOfTheWeek.title && (
        <div style={{ padding: "24px 0", borderBottom: "1px solid #e7e5e4" }}>
          <p
            style={{
              margin: "0 0 8px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#004A9E",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Article of the Week
          </p>
          <h3 style={{ margin: "0 0 12px", fontSize: "18px", fontWeight: "bold" }}>
            {edition.articleOfTheWeek.title}
          </h3>
          {edition.articleOfTheWeek.intro && (
            <p style={{ margin: "0 0 16px", fontSize: "14px", lineHeight: "1.6", color: "#57534e" }}>
              {edition.articleOfTheWeek.intro}
            </p>
          )}
          <a
            href={`${baseUrl}${edition.articleOfTheWeek.articleHref}`}
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#004A9E",
              color: "#ffffff",
              textDecoration: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Read the Full Article →
          </a>
        </div>
      )}

      {/* 104-Week Challenge */}
      <div style={{ padding: "24px 0", borderBottom: "1px solid #e7e5e4" }}>
        <p
          style={{
            margin: "0 0 8px",
            fontSize: "12px",
            fontWeight: "600",
            color: "#004A9E",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          104-Week Watch Challenge
        </p>
        <p style={{ margin: "0 0 12px", fontSize: "14px", lineHeight: "1.6", color: "#57534e" }}>
          Financial freedom is more valuable if you have the health to enjoy it. Join the AS Brokers
          104-Week Watch Challenge for consistent improvement in health and fitness.
        </p>
        <a
          href={`${baseUrl}${edition.watchChallenge.challengeHref}`}
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#004A9E",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          Join the Challenge →
        </a>
      </div>

      {/* Your Financial Plan - Quick Links */}
      <div style={{ padding: "24px 0", borderBottom: "1px solid #e7e5e4" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: "16px", fontWeight: "bold" }}>
          Your Financial Plan
        </h3>
        <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#57534e" }}>
          Click any section to learn more about that part of your financial life:
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {edition.evergreenSections.map((section, idx) => (
              <tr key={section.id}>
                <td
                  style={{
                    padding: "8px 0",
                    borderBottom: idx < edition.evergreenSections.length - 1 ? "1px solid #e7e5e4" : "none",
                  }}
                >
                  <a
                    href={`${newsletterUrl}#accordion-header-${section.id}`}
                    style={{
                      color: "#004A9E",
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {section.shortTitle} →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTA to full newsletter */}
      <div style={{ padding: "24px 0", textAlign: "center" }}>
        <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#57534e" }}>
          Read the complete newsletter with all sections, resources, and tools:
        </p>
        <a
          href={newsletterUrl}
          style={{
            display: "inline-block",
            padding: "14px 28px",
            backgroundColor: "#004A9E",
            color: "#ffffff",
            textDecoration: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Read Full Newsletter
        </a>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "24px 0 0",
          borderTop: "1px solid #e7e5e4",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 4px", fontSize: "16px", fontWeight: "bold" }}>AS Brokers</p>
        <p style={{ margin: "0 0 16px", fontSize: "12px", color: "#78716c" }}>
          Create. Protect. Preserve.
        </p>
        <p style={{ margin: "0", fontSize: "11px", color: "#a8a29e" }}>
          AS Brokers CC (FSP 17273) | 25+ years of trusted financial guidance
        </p>
        <div style={{ marginTop: "16px" }}>
          <a
            href={baseUrl}
            style={{ margin: "0 8px", color: "#78716c", textDecoration: "none", fontSize: "12px" }}
          >
            Website
          </a>
          <a
            href={`${baseUrl}/contact`}
            style={{ margin: "0 8px", color: "#78716c", textDecoration: "none", fontSize: "12px" }}
          >
            Contact
          </a>
          <a
            href={`${baseUrl}/about`}
            style={{ margin: "0 8px", color: "#78716c", textDecoration: "none", fontSize: "12px" }}
          >
            About
          </a>
        </div>
      </div>
    </div>
  );
}
