type Props = {
  children: React.ReactNode;
  className?: string;
  /** Seconds — staggered entrance without Framer Motion. */
  delay?: number;
};

/** CSS-only reveal — avoids Framer Motion on marketing hub critical path. */
export function HubReveal({ children, className = "", delay = 0 }: Props) {
  return (
    <div
      className={`motion-safe:animate-hub-reveal motion-reduce:animate-none ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
