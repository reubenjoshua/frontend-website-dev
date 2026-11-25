import type { Place } from "@/features/explore/types";
import { ResultCard } from "./result-card";

type Props = {
  places: Place[];
  isLoading: boolean;
  isError: boolean;
};

export function ResultsList({ places, isLoading, isError }: Props) {
  if (isLoading) {
    return (
      <div
        className="grid gap-0 divide-y divide-border/80"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading neighborhoods"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-4 py-6">
            <div className="h-3 w-20 rounded bg-accent-soft motion-safe:animate-pulse" />
            <div className="h-7 w-48 rounded bg-accent-soft motion-safe:animate-pulse" />
            <div className="h-4 w-full max-w-xl rounded bg-accent-soft/80 motion-safe:animate-pulse" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((__, metricIndex) => (
                <div
                  key={metricIndex}
                  className="h-8 rounded bg-accent-soft/70 motion-safe:animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p
        className="border-y border-danger/20 py-8 text-danger"
        role="alert"
      >
        Couldn’t load neighborhoods. Try again.
      </p>
    );
  }

  if (places.length === 0) {
    return (
      <div
        className="border-y border-border/80 py-12 text-center"
        role="status"
      >
        <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
          No matches in this view
        </p>
        <p className="mt-2 text-sm text-muted">
          Clear search or pick another district to see more neighborhoods.
        </p>
      </div>
    );
  }

  return (
    <section aria-labelledby="results-heading">
      <div className="mb-1 flex items-baseline justify-between gap-3">
        <h2
          id="results-heading"
          className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground"
        >
          Neighborhoods
        </h2>
        <p className="text-sm tabular-nums text-muted" aria-live="polite">
          {places.length} shown
        </p>
      </div>

      <ul className="list-none p-0">
        {places.map((place) => (
          <li key={place.id}>
            <ResultCard place={place} />
          </li>
        ))}
      </ul>
    </section>
  );
}
