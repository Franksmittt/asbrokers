/** Public WhatsApp booking line (Albert / AS Brokers). */
export const WHATSAPP_E164 = "27662276044";
export const WHATSAPP_DISPLAY = "+27 66 227 6044";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_E164}`;

/** Build a wa.me URL with an optional prefilled message. */
export function whatsappUrl(message?: string): string {
  if (!message?.trim()) return WHATSAPP_BASE_URL;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message.trim())}`;
}

export const WHATSAPP_CAPITAL_ASSESSMENT_MESSAGE =
  "Hi AS Brokers, I would like to contact an independent adviser (FSP 17273).";

export const WHATSAPP_CALCULATOR_MESSAGE =
  "Hi AS Brokers, I just used a calculator on your site and would like to talk through the numbers.";
