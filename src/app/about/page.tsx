import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About page for the Next.js template",
};

// Simulate data fetching with delay
async function getData() {
  // Uncomment to see loading state
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    title: "About This Template",
    description:
      "This is a comprehensive Next.js template demonstrating best practices for routing, API routes, loading states, and error handling.",
  };
}

export default async function AboutPage() {
  const data = await getData();

  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
        <Link
          href="/"
          className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold">{data.title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {data.description}
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>App Router with file-based routing</li>
            <li>API Routes for backend functionality</li>
            <li>Loading states with loading.tsx</li>
            <li>Error boundaries with error.tsx</li>
            <li>Custom 404 page</li>
            <li>TypeScript support</li>
            <li>Tailwind CSS styling</li>
            <li>Nested routes and layouts</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Structure</h2>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              {`app/
├── layout.tsx          # Root layout
├── page.tsx            # Home page
├── loading.tsx         # Root loading UI
├── error.tsx           # Root error boundary
├── not-found.tsx       # 404 page
├── about/
│   ├── page.tsx        # About page
│   ├── loading.tsx     # About loading UI
│   └── error.tsx       # About error boundary
├── dashboard/
│   ├── page.tsx        # Dashboard page
│   └── settings/
│       └── page.tsx    # Nested route
└── api/
    ├── health/
    │   └── route.ts    # Health check endpoint
    └── data/
        └── route.ts    # Data endpoint`}
            </code>
          </pre>
        </section>
      </main>
    </div>
  );
}
