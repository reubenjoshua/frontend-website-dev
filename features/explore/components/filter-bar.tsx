"use client";

import type { ExploreDistrict } from "@/features/explore/hooks/use-explore-filters";
import type { PlaceSort } from "@/features/explore/types";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";

type Props = {
  district: ExploreDistrict;
  sort: PlaceSort;
  q: string;
  districts: string[];
  onDistrictChange: (value: ExploreDistrict) => void;
  onSortChange: (value: PlaceSort) => void;
  onQueryChange: (value: string) => void;
};

export function FilterBar({
  district,
  sort,
  q,
  districts,
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
          <Input
            type="search"
            value={q}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Neighborhood name"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-foreground">District</span>
          <Select
            value={district}
            onChange={(event) => onDistrictChange(event.target.value)}
          >
            <option value="all">All districts</option>
            {districts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-foreground">Sort by</span>
          <Select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as PlaceSort)}
          >
            <option value="name">Name</option>
            <option value="airQuality">Air quality</option>
            <option value="transitScore">Transit</option>
            <option value="greenSpace">Green space</option>
            <option value="noise">Quietness</option>
          </Select>
        </label>
      </fieldset>
    </form>
  );
}
