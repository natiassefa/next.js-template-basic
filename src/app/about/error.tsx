"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AboutError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("About page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 max-w-4xl mx-auto w-full items-center text-center">
        <h1 className="text-3xl font-bold">Error Loading About Page</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Something went wrong while loading the about page.
        </p>
        {error.digest && (
          <p className="text-sm text-gray-500">Error ID: {error.digest}</p>
        )}
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-foreground rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </main>
    </div>
  );
}
