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
      <div className="grid gap-4" aria-busy="true" aria-live="polite">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-lg border border-border bg-surface"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="rounded-lg border border-danger/30 bg-surface p-4 text-danger" role="alert">
        Couldn’t load neighborhoods. Try again.
      </p>
    );
  }

  if (places.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-surface p-4 text-muted">
        No neighborhoods match these filters.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {places.map((place) => (
        <ResultCard key={place.id} place={place} />
      ))}
    </div>
  );
}