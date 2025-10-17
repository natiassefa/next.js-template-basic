import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 p-6 border-r border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            Overview
          </Link>
          <Link
            href="/dashboard/settings"
            className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
            Settings
          </Link>
          <Link
            href="/"
            className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-sm text-gray-600 dark:text-gray-400"
          >
            ← Back to Home
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
