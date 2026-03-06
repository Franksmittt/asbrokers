import { task } from "@trigger.dev/sdk";
import { Resend } from "resend";

export type GenerateFinancialPdfPayload = {
  email: string;
  fullName?: string;
  portfolio?: number;
  drawdown?: number;
};

export const generateFinancialPdf = task({
  id: "generate-financial-pdf",
  run: async (payload: GenerateFinancialPdfPayload) => {
    const { email, fullName, portfolio = 15_000_000, drawdown = 120_000 } = payload;
    const baseUrl = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const url = new URL("/internal/pdf-report", baseUrl);
    url.searchParams.set("portfolio", String(portfolio));
    url.searchParams.set("drawdown", String(drawdown));

    const puppeteer = await import("puppeteer");
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    });

    try {
      const page = await browser.newPage();
      await page.goto(url.toString(), {
        waitUntil: "networkidle0",
        timeout: 30_000,
      });
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
      });

      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM ?? "AS Brokers <onboarding@resend.dev>";
      const { error } = await resend.emails.send({
        from,
        to: [email],
        subject: "Your AS Brokers Wealth Projection",
        html: fullName
          ? `<p>Hi ${fullName},</p><p>Please find your wealth projection PDF attached.</p><p>AS Brokers CC · FSP 17273</p>`
          : `<p>Please find your wealth projection PDF attached.</p><p>AS Brokers CC · FSP 17273</p>`,
        attachments: [
          {
            filename: "AS_Brokers_Wealth_Projection.pdf",
            content: pdfBuffer as Buffer,
          },
        ],
      });

      if (error) {
        throw new Error(`Resend failed: ${JSON.stringify(error)}`);
      }

      return { ok: true, email };
    } finally {
      await browser.close();
    }
  },
});
