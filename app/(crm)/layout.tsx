/**
 * CRM route group — dark baseline isolated from marketing (content) layout.
 * URLs remain /crm/* via nested app/(crm)/crm/ segment.
 */
export default function CrmRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-app-shell="crm"
      className="min-h-screen bg-void text-white antialiased selection:bg-samsung-blue selection:text-white"
    >
      {children}
    </div>
  );
}
