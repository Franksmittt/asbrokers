/** Static hero backdrop — CSS gradients only (no expensive blur filters). */
export function BackgroundOrbs() {
  return (
    <div
      className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_70%_at_15%_10%,rgba(20,184,166,0.22),transparent_70%),radial-gradient(ellipse_60%_80%_at_85%_20%,rgba(255,127,80,0.16),transparent_70%),radial-gradient(ellipse_40%_40%_at_20%_85%,rgba(20,184,166,0.08),transparent_70%)]"
      aria-hidden
    />
  );
}
