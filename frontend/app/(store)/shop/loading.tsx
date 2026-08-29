import { Skeleton } from "@/components/ui/skeleton";

/** Route-level loading state: mirrors the shop layout so the swap is calm. */
export default function ShopLoading() {
  return (
    <div className="shell py-8 lg:py-12">
      <Skeleton className="h-3 w-24 rounded-none" />
      <div className="mt-6 border-b border-line pb-8 lg:mt-8 lg:pb-10">
        <Skeleton className="h-10 w-64 max-w-full rounded-none lg:h-12" />
        <Skeleton className="mt-4 h-4 w-96 max-w-full rounded-none" />
      </div>

      <div className="mt-8 lg:mt-12 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-14">
        <aside className="hidden lg:block">
          <div className="flex flex-col gap-6">
            {Array.from({ length: 4 }).map((_, section) => (
              <div key={section} className="border-t border-line pt-6">
                <Skeleton className="h-3 w-20 rounded-none" />
                <div className="mt-4 flex flex-col gap-3">
                  {Array.from({ length: 4 }).map((_, row) => (
                    <Skeleton key={row} className="h-4 w-full rounded-none" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-10 w-28 rounded-none lg:hidden" />
            <Skeleton className="h-10 min-w-44 flex-1 rounded-none lg:max-w-64" />
            <Skeleton className="ml-auto h-10 w-44 rounded-none" />
            <Skeleton className="hidden h-10 w-20 rounded-none sm:block" />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 lg:gap-y-14 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="aspect-[3/4] w-full rounded-none" />
                <Skeleton className="mt-4 h-3 w-16 rounded-none" />
                <Skeleton className="mt-2 h-4 w-3/4 rounded-none" />
                <Skeleton className="mt-2 h-3 w-12 rounded-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
