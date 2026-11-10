import Link from "next/link";

// Global fallback — reached only for non-locale-prefixed URLs
// the middleware didn't rewrite.
export default function RootNotFound() {
  return (
    <section className="container-wide min-h-[70svh] flex flex-col justify-center py-32">
      <p className="font-mono text-6xl">404</p>
      <h1 className="mt-8 text-5xl">Page not found</h1>
      <p className="mt-6 max-w-xl text-lg">The page you requested no longer exists.</p>
      <div className="mt-10">
        <Link
          href="/ka"
          className="inline-flex h-11 items-center gap-2 rounded-md border border-current px-5 text-sm"
        >
          ← Back to home
        </Link>
      </div>
    </section>
  );
}
