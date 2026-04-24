import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-gray-400 mb-6">The page you’re looking for doesn’t exist or has been moved.</p>
      <Link
        href="/"
        className="text-cinematic-teal font-semibold hover:underline"
      >
        Return home
      </Link>
    </div>
  );
}
