import Link from "next/link";

export default function PlaceNotFound() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col justify-center px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
        Neighborhood not found
      </h1>
      <p className="mt-3 text-muted">
        That place isn’t in the City Pulse dataset.
      </p>
      <Link href="/explore" className="mt-6 text-accent underline-offset-4 hover:underline">
        Back to explore
      </Link>
    </main>
  );
}