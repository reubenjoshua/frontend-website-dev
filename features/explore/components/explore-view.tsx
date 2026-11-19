"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlaces } from "@/features/explore/api/get-places";
import { placeKeys } from "@/features/explore/api/query-keys";
import { useExploreFilters } from "@/features/explore/hooks/use-explore-filters";
import { FilterBar } from "./filter-bar";
import { ResultsList } from "./results-list";

export function ExploreView() {
  const [filters, setFilters] = useExploreFilters();

  const query = useQuery({
    queryKey: placeKeys.list(filters),
    queryFn: () => getPlaces(filters),
  });

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold tracking-[0.18em] text-accent uppercase">
          Explore
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Neighborhood signals
        </h1>
        <p className="mt-3 text-muted">
          Filter by district, search by name, and sort by the metric that matters
          to you. Share the URL to keep the same view.
        </p>
      </header>

      <FilterBar
        district={filters.district}
        sort={filters.sort}
        q={filters.q}
        onDistrictChange={(district) => setFilters({ district })}
        onSortChange={(sort) => setFilters({ sort })}
        onQueryChange={(q) => setFilters({ q })}
      />

      <ResultsList
        places={query.data ?? []}
        isLoading={query.isLoading}
        isError={query.isError}
      />
    </div>
  );
}