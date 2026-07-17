export function SkeletonCard({ children, singleColumn = false }: { children: React.ReactNode, singleColumn?: boolean }) {
  return (
    <div className={`bg-surface-container border-[4px] border-black p-6 md:p-8 neobrutal-shadow h-fit ${singleColumn ? "max-w-2xl mb-12" : ""}`}>
      {children}
    </div>
  );
}

export function SkeletonTitle({ width = "w-1/2" }) {
  return <div className={`h-8 bg-surface-container-highest border-[3px] border-black ${width} max-w-[300px] mb-6`} />;
}

export function SkeletonInput() {
  return (
    <div>
      <div className="h-5 bg-surface-container-highest border-[3px] border-black w-32 mb-2" />
      <div className="h-[52px] bg-surface border-[3px] border-black w-full" />
    </div>
  );
}

export function SkeletonImageInput() {
  return (
    <div>
      <div className="h-5 bg-surface-container-highest border-[3px] border-black w-40 mb-2" />
      <div className="flex gap-4">
         <div className="w-24 h-15 bg-surface border-[3px] border-black rounded-xl" />
         <div className="flex-1 h-[52px] bg-surface border-[3px] border-black" />
      </div>
    </div>
  );
}

export function SkeletonTextarea({ rows = 4 }: { rows?: number }) {
  const height = rows === 3 ? "h-[90px]" : rows === 8 ? "h-[220px]" : "h-[120px]";
  return (
    <div>
      <div className="h-5 bg-surface-container-highest border-[3px] border-black w-28 mb-2" />
      <div className={`${height} bg-surface border-[3px] border-black w-full`} />
    </div>
  );
}

export function SkeletonButton({ width = "w-32" }) {
  return <div className={`h-[52px] bg-surface-container-highest border-[3px] border-black ${width} mt-4`} />;
}

export function SkeletonListItem() {
  return (
    <div className="bg-surface-container-low border-[3px] border-black p-6 neobrutal-shadow-sm flex flex-col sm:flex-row justify-between items-start gap-4">
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
  );
}
