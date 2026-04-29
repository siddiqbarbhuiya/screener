import SkeletonCard from './SkeletonCard';

export default function DashboardSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <SkeletonCard className="h-28" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} className="h-20" />
        ))}
      </div>
      <SkeletonCard className="h-72" />
      <SkeletonCard className="h-32" />
    </div>
  );
}
