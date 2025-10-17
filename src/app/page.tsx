import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold">Next.js Template</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A comprehensive starter template with routing, API routes, loading
            states, and error boundaries.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/about"
            className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">About →</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Learn more about this template and its features.
            </p>
          </Link>

          <Link
            href="/dashboard"
            className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            <h2 className="text-2xl font-semibold mb-2">Dashboard →</h2>
            <p className="text-gray-600 dark:text-gray-400">
              View the dashboard with nested routes and layouts.
            </p>
          </Link>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="font-semibold mb-2">App Router</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                File-based routing with layouts and nested routes
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="font-semibold mb-2">API Routes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                RESTful API endpoints at /api/health and /api/data
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="font-semibold mb-2">Loading States</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatic loading UI with loading.tsx files
              </p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="font-semibold mb-2">Error Boundaries</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Graceful error handling with error.tsx files
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">API Examples</h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                Health Check
              </p>
              <code>GET /api/health</code>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                Get all data
              </p>
              <code>GET /api/data</code>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 mb-1">
                Create new item
              </p>
              <code>POST /api/data</code>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Getting Started</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Clone this template for your next project</li>
            <li>Install dependencies with npm install</li>
            <li>Run the development server with npm run dev</li>
            <li>Start building your application!</li>
          </ol>
        </section>
      </main>
    </div>
  );
}
