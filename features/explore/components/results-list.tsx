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
        className="grid gap-4"
        aria-busy="true"
        aria-live="polite"
        aria-label="Loading neighborhoods"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 rounded-lg border border-border bg-surface motion-safe:animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p
        className="rounded-lg border border-danger/30 bg-surface p-4 text-danger"
        role="alert"
      >
        Couldn’t load neighborhoods. Try again.
      </p>
    );
  }

  if (places.length === 0) {
    return (
      <p
        className="rounded-lg border border-border bg-surface p-4 text-muted"
        role="status"
      >
        No neighborhoods match these filters.
      </p>
    );
  }

  return (
    <section aria-labelledby="results-heading">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <h2
          id="results-heading"
          className="text-lg font-semibold text-foreground"
        >
          Results
        </h2>
        <p className="text-sm text-muted" aria-live="polite">
          {places.length} neighborhood{places.length === 1 ? "" : "s"}
        </p>
      </div>

      <ul className="grid list-none gap-4 p-0">
        {places.map((place) => (
          <li key={place.id}>
            <ResultCard place={place} />
          </li>
        ))}
      </ul>
    </section>
  );
}
