import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Dashboard settings page",
};

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              defaultValue="johndoe"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
              disabled
            />
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Receive email updates about your account
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5"
              disabled
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use dark theme
              </p>
            </div>
            <input type="checkbox" className="w-5 h-5" disabled />
          </div>
        </div>
      </section>

      <div className="text-sm text-gray-600 dark:text-gray-400">
        Note: This is a template page. Form inputs are disabled for demonstration.
      </div>
    </div>
  );
}
