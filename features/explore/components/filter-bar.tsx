"use client";

import type { ExploreDistrict } from "@/features/explore/hooks/use-explore-filters";
import type { PlaceSort } from "@/features/explore/types";

type Props = {
  district: ExploreDistrict;
  sort: PlaceSort;
  q: string;
  onDistrictChange: (value: ExploreDistrict) => void;
  onSortChange: (value: PlaceSort) => void;
  onQueryChange: (value: string) => void;
};

export function FilterBar({
  district,
  sort,
  q,
  onDistrictChange,
  onSortChange,
  onQueryChange,
}: Props) {
  return (
    <form
      className="grid gap-4 rounded-lg border border-border bg-surface p-4 sm:grid-cols-3"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Search</span>
        <input
          type="search"
          value={q}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Neighborhood name"
          className="h-10 rounded-md border border-border bg-background px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">District</span>
        <select
          value={district}
          onChange={(event) =>
            onDistrictChange(event.target.value as ExploreDistrict)
          }
          className="h-10 rounded-md border border-border bg-background px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="all">All districts</option>
          <option value="north">North</option>
          <option value="south">South</option>
          <option value="east">East</option>
          <option value="west">West</option>
          <option value="central">Central</option>
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Sort by</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value as PlaceSort)}
          className="h-10 rounded-md border border-border bg-background px-3 text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="name">Name</option>
          <option value="airQuality">Air quality</option>
          <option value="transitScore">Transit</option>
          <option value="greenSpace">Green space</option>
          <option value="noise">Quietness</option>
        </select>
      </label>
    </form>
  );
}