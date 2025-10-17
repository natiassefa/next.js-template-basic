export default function AboutLoading() {
  return (
    <div className="flex flex-col min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 max-w-4xl mx-auto w-full animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
