import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard overview page",
};

async function getDashboardData() {
  // Simulate API call
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    stats: [
      { label: "Total Users", value: "1,234" },
      { label: "Active Sessions", value: "56" },
      { label: "Revenue", value: "$12,345" },
      { label: "Growth", value: "+12.5%" },
    ],
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {stat.label}
            </p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm">User registration</span>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-sm">New order received</span>
            <span className="text-sm text-gray-500">15 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">System update completed</span>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
        </div>
      </section>
    </div>
  );
}
