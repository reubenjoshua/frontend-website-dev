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

const fieldClass =
  "h-11 rounded-lg border border-border bg-background px-3 text-foreground outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/25";

export function FilterBar({
  district,
  sort,
  q,
  onDistrictChange,
  onSortChange,
  onQueryChange,
}: Props) {
  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <fieldset className="grid gap-4 rounded-xl border border-border bg-surface p-5 sm:grid-cols-3 sm:p-6">
        <legend className="sr-only">Filter neighborhoods</legend>

        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-foreground">Search</span>
          <input
            type="search"
            value={q}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Neighborhood name"
            className={fieldClass}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-foreground">District</span>
          <select
            value={district}
            onChange={(event) =>
              onDistrictChange(event.target.value as ExploreDistrict)
            }
            className={fieldClass}
          >
            <option value="all">All districts</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
            <option value="central">Central</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-foreground">Sort by</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as PlaceSort)}
            className={fieldClass}
          >
            <option value="name">Name</option>
            <option value="airQuality">Air quality</option>
            <option value="transitScore">Transit</option>
            <option value="greenSpace">Green space</option>
            <option value="noise">Quietness</option>
          </select>
        </label>
      </fieldset>
    </form>
  );
}
