export default function ExploreLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-10">
      <div className="space-y-3">
        <div className="h-4 w-24 rounded bg-accent-soft motion-safe:animate-pulse" />
        <div className="h-10 w-72 rounded bg-accent-soft motion-safe:animate-pulse" />
        <div className="h-16 w-full max-w-xl rounded bg-accent-soft/80 motion-safe:animate-pulse" />
      </div>
      <div className="h-32 rounded-xl border border-border bg-surface motion-safe:animate-pulse" />
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-xl border border-border bg-surface motion-safe:animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
