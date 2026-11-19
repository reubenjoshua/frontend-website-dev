export default function RootLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-16 sm:px-10">
      <div className="h-8 w-40 rounded bg-accent-soft motion-safe:animate-pulse" />
      <div className="h-14 w-3/4 max-w-xl rounded bg-accent-soft motion-safe:animate-pulse" />
      <div className="h-20 w-full max-w-lg rounded bg-accent-soft/80 motion-safe:animate-pulse" />
    </div>
  );
}
