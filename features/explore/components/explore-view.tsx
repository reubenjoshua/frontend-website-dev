"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { placeKeys } from "@/features/explore/api/query-keys";
import { useDebouncedValue } from "@/features/explore/hooks/use-debounced-value";
import { useExploreFilters } from "@/features/explore/hooks/use-explore-filters";
import { filterPlaces } from "@/features/explore/lib/filter-places";
import { usePlaces } from "@/shared/providers/places-provider";
import { FilterBar } from "./filter-bar";
import { ResultsList } from "./results-list";

function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function ExploreView() {
  const { places, districts, ready } = usePlaces();
  const [filters, setFilters] = useExploreFilters();
  const [searchInput, setSearchInput] = useState(filters.q);
  const [urlQuery, setUrlQuery] = useState(filters.q);

  if (filters.q !== urlQuery) {
    setUrlQuery(filters.q);
    setSearchInput(filters.q);
  }

  const debouncedSearch = useDebouncedValue(searchInput, 250);

  useEffect(() => {
    if (debouncedSearch === filters.q) return;
    void setFilters({ q: debouncedSearch });
  }, [debouncedSearch, filters.q, setFilters]);

  const queryFilters = useMemo(
    () => ({
      ...filters,
      q: debouncedSearch,
    }),
    [filters, debouncedSearch],
  );

  const query = useQuery({
    queryKey: placeKeys.list({ ...queryFilters, count: places.length }),
    enabled: ready,
    queryFn: async () => {
      await delay();
      return filterPlaces(places, queryFilters);
    },
  });

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top_left,_rgba(106,158,190,0.14)_0%,_transparent_55%)]"
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:px-10">
        <header className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-accent uppercase">
            Explore
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-snug font-semibold tracking-tight text-foreground sm:text-5xl">
            Neighborhood signals
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Filter by district, search by name, and sort by the metric that
            matters to you. Share the URL to keep the same view.
          </p>
        </header>

        <FilterBar
          district={filters.district}
          sort={filters.sort}
          q={searchInput}
          districts={districts}
          onDistrictChange={(district) => setFilters({ district })}
          onSortChange={(sort) => setFilters({ sort })}
          onQueryChange={setSearchInput}
        />

        <div
          className={`transition-opacity duration-300 ${
            query.isFetching && !query.isLoading ? "opacity-70" : "opacity-100"
          }`}
        >
          <ResultsList
            places={query.data ?? []}
            isLoading={!ready || query.isLoading}
            isError={query.isError}
          />
        </div>
      </div>
    </div>
  );
}
