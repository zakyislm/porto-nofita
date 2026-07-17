export default function AdminPageSkeleton({ singleColumn = false }: { singleColumn?: boolean }) {
  return (
    <div className="space-y-12 animate-pulse">
      <div className={`grid ${singleColumn ? "" : "xl:grid-cols-2"} gap-12`}>
        {/* Form Skeleton */}
        <div className={`bg-surface-container border-[4px] border-black p-6 md:p-8 neobrutal-shadow ${singleColumn ? "max-w-2xl" : ""}`}>
          <div className="h-8 bg-surface-container-highest border-[3px] border-black w-3/4 max-w-[300px] mb-6" />
          <div className="space-y-6">
            <div>
              <div className="h-5 bg-surface-container-highest border-[3px] border-black w-32 mb-2" />
              <div className="h-[52px] bg-surface border-[3px] border-black w-full" />
            </div>
            <div>
              <div className="h-5 bg-surface-container-highest border-[3px] border-black w-24 mb-2" />
              <div className="h-[52px] bg-surface border-[3px] border-black w-full" />
            </div>
            <div>
              <div className="h-5 bg-surface-container-highest border-[3px] border-black w-28 mb-2" />
              <div className="h-[120px] bg-surface border-[3px] border-black w-full" />
            </div>
            <div className="flex gap-4 pt-4">
              <div className="h-[52px] bg-surface-container-highest border-[3px] border-black w-32" />
              <div className="h-[52px] bg-surface border-[3px] border-black w-28" />
            </div>
          </div>
        </div>

        {/* List Skeleton */}
        {!singleColumn && (
          <div className="bg-surface-container border-[4px] border-black p-6 md:p-8 neobrutal-shadow h-fit">
            <div className="h-8 bg-surface-container-highest border-[3px] border-black w-3/4 max-w-[250px] mb-6" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-surface-container-low border-[3px] border-black p-6 neobrutal-shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="w-full">
                    <div className="h-6 bg-surface-container-highest border-[3px] border-black w-3/4 mb-2" />
                    <div className="h-4 bg-surface-container-highest border-[3px] border-black w-1/2 mb-3" />
                    <div className="space-y-2">
                      <div className="h-4 bg-surface-container-highest border-[3px] border-black w-full" />
                      <div className="h-4 bg-surface-container-highest border-[3px] border-black w-5/6" />
                    </div>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <div className="h-[34px] w-[64px] bg-surface-container-highest border-[3px] border-black" />
                    <div className="h-[34px] w-[76px] bg-surface-container-highest border-[3px] border-black" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
