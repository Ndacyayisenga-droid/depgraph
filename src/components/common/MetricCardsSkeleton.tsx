import { CardSkeleton } from "./CardSkeleton";

export function MetricCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <CardSkeleton key={i} className="h-[104px]" />
      ))}
    </section>
  );
}
