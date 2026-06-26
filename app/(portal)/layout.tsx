/**
 * Client Portal route group — dark baseline isolated from marketing layout.
 * URLs remain /portal/* via nested app/(portal)/portal/ segment (Phase 2+ pages).
 */
export default function PortalRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-app-shell="portal"
      className="min-h-screen bg-void text-white antialiased selection:bg-samsung-blue selection:text-white"
    >
      {children}
    </div>
  );
}
