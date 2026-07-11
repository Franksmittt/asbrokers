type Props = {
  children: React.ReactNode;
  className?: string;
  /** Seconds, staggered entrance without Framer Motion. */
  delay?: number;
  /** Skip CSS entrance on above-fold LCP blocks. */
  instant?: boolean;
};

/** CSS-only reveal, avoids Framer Motion on marketing hub critical path. */
export function HubReveal({ children, className = "", delay = 0, instant = false }: Props) {
  if (instant) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={`motion-safe:animate-hub-reveal motion-reduce:animate-none ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
