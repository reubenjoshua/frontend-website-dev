import type { Metadata } from "next";
import { Suspense } from "react";
import { ExploreView } from "@/features/explore/components/explore-view";

export const metadata: Metadata = {
  title: "Explore",
};

function ExploreFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10">
      <div className="h-10 w-48 rounded bg-surface motion-safe:animate-pulse" />
      <div className="mt-6 h-28 rounded-lg border border-border bg-surface motion-safe:animate-pulse" />
      <div className="mt-8 grid gap-4" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-lg border border-border bg-surface motion-safe:animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <main className="min-h-svh bg-background">
      <Suspense fallback={<ExploreFallback />}>
        <ExploreView />
      </Suspense>
    </main>
  );
}