export default function ProductSkeleton() {
  return (
    <div className="bg-surface rounded-2xl border border-[var(--color-border)] overflow-hidden">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-4 skeleton w-3/4" />
        <div className="h-4 skeleton w-1/2" />
      </div>
    </div>
  );
}
