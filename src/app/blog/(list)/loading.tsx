import { Skeleton } from "@/components/ui/Skeleton";

export default function BlogLoading() {
  return (
    <div>
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-4 w-full max-w-md" />
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-20 rounded-lg" />
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-border"
          >
            <Skeleton className="aspect-16/9 w-full rounded-none" />
            <div className="flex flex-col gap-3 p-5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
