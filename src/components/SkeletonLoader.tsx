export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="bg-[#151821] rounded-xl p-6 border border-gray-800 animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-gray-700 rounded w-32"></div>
            <div className="h-6 bg-gray-700 rounded w-20"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-6 bg-gray-700 rounded w-16"></div>
            <div className="h-6 bg-gray-700 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
