import DecorativeShapes from "@/components/DecorativeShapes";

export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Navbar Skeleton */}
      <header className="w-full sticky top-0 z-50 bg-surface border-b-[3px] border-black neobrutal-shadow flex justify-center px-6 py-4">
        <div className="w-full max-w-7xl flex justify-between items-center">
          <div className="h-8 w-40 bg-black/10 animate-pulse border-[2px] border-black" />
          <div className="hidden lg:flex gap-8">
            <div className="h-4 w-16 bg-black/10 animate-pulse" />
            <div className="h-4 w-16 bg-black/10 animate-pulse" />
            <div className="h-4 w-16 bg-black/10 animate-pulse" />
            <div className="h-4 w-16 bg-black/10 animate-pulse" />
          </div>
          <div className="lg:hidden h-10 w-10 bg-black/10 animate-pulse border-[2px] border-black" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pb-16 md:pb-24 space-y-24 mt-8 md:mt-10">
        {/* Hero Section Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 bg-primary-container/20 border-[4px] border-black p-6 md:p-8 lg:p-10 neobrutal-shadow-lg relative overflow-hidden h-[400px]">
            <div className="space-y-6">
              <div className="h-8 w-48 bg-black/10 border-[3px] border-black animate-pulse" />
              <div className="h-16 w-3/4 bg-black/10 animate-pulse" />
              <div className="h-24 w-full bg-black/10 animate-pulse" />
              <div className="flex gap-4">
                <div className="h-14 w-40 bg-black/10 border-[3px] border-black animate-pulse" />
                <div className="h-14 w-48 bg-black/10 border-[3px] border-black animate-pulse" />
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[280px] aspect-square border-[4px] border-black neobrutal-shadow-lg bg-black/10 animate-pulse" />
          </div>
        </section>

        {/* About Section Skeleton */}
        <section className="bg-surface-container/20 border-[3px] border-black p-8 md:p-12 neobrutal-shadow relative h-[250px]">
          <div className="h-12 w-48 bg-black/10 mb-6 animate-pulse" />
          <div className="h-32 w-full bg-black/10 animate-pulse" />
        </section>

        {/* Skills Section Skeleton */}
        <section className="bg-surface-container-highest/20 border-[3px] border-black p-8 md:p-12 neobrutal-shadow relative h-[250px]">
          <div className="h-12 w-32 bg-black/10 mb-8 animate-pulse" />
          <div className="flex flex-wrap gap-4">
            <div className="h-12 w-24 bg-black/10 border-[2px] border-black animate-pulse" />
            <div className="h-12 w-32 bg-black/10 border-[2px] border-black animate-pulse" />
            <div className="h-12 w-28 bg-black/10 border-[2px] border-black animate-pulse" />
            <div className="h-12 w-40 bg-black/10 border-[2px] border-black animate-pulse" />
            <div className="h-12 w-20 bg-black/10 border-[2px] border-black animate-pulse" />
          </div>
        </section>

      </div>
    </div>
  );
}
