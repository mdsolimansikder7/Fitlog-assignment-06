import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-accent sm:text-sm">
        Error 404
      </p>
      <h1 className="font-display text-4xl uppercase sm:text-5xl">Page Not Found</h1>
      <p className="mt-4 max-w-md text-sm text-gray-400 sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-md bg-accent px-6 py-3 font-semibold text-black hover:opacity-90"
      >
        Go to workouts
      </Link>
    </div>
  );
}