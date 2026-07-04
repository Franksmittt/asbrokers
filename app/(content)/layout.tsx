/** Warm premium canvas for all public marketing routes under (content). */
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-warm-canvas pb-24 text-shark md:pb-0">{children}</div>;
}
