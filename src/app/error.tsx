"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
        An error occurred while rendering this page. Please try again.
      </p>
      {error.digest && (
        <p className="text-sm text-gray-500 mb-4">Error ID: {error.digest}</p>
      )}
      <button
        onClick={reset}
        className="px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </div>
  );
}
