import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <h1 className="text-8xl font-heading font-bold text-primary mb-4">404</h1>
        <p className="text-text/60 text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center bg-primary text-background px-7 py-3.5 radius-button font-bold text-sm hover:bg-secondary motion-normal min-h-[44px]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
