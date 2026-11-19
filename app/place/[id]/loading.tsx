export default function PlaceLoading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
      <div className="h-4 w-32 rounded bg-accent-soft motion-safe:animate-pulse" />
      <div className="mt-8 h-12 w-2/3 max-w-md rounded bg-accent-soft motion-safe:animate-pulse" />
      <div className="mt-4 h-16 w-full max-w-2xl rounded bg-accent-soft/80 motion-safe:animate-pulse" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 rounded-xl border border-border bg-surface motion-safe:animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
