"use client";

import type { ExploreDistrict } from "@/features/explore/hooks/use-explore-filters";
import type { PlaceSort } from "@/features/explore/types";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { cn } from "@/shared/lib/utils";

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
    <form
      onSubmit={(event) => event.preventDefault()}
      aria-label="Filter neighborhoods"
      className="flex flex-col gap-5 border-y border-border/80 py-5"
    >
      <label className="flex flex-col gap-2 text-sm">
        <span className="font-medium text-foreground">Search</span>
        <Input
          type="search"
          value={q}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by neighborhood name"
          className="h-12 bg-surface text-base"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-foreground">
            District
          </legend>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onDistrictChange("all")}
              aria-pressed={district === "all"}
              className={cn(
                "cursor-pointer rounded-lg px-3.5 py-2 text-sm font-semibold capitalize transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                district === "all"
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface text-muted ring-1 ring-border hover:text-accent hover:ring-accent/40",
              )}
            >
              All
            </button>
            {districts.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onDistrictChange(item)}
                aria-pressed={district === item}
                className={cn(
                  "cursor-pointer rounded-lg px-3.5 py-2 text-sm font-semibold capitalize transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  district === item
                    ? "bg-accent text-accent-foreground"
                    : "bg-surface text-muted ring-1 ring-border hover:text-accent hover:ring-accent/40",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="flex w-full max-w-[14rem] flex-col gap-2 text-sm">
          <span className="font-medium text-foreground">Sort by</span>
          <Select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as PlaceSort)}
            className="bg-surface"
          >
            <option value="name">Name</option>
            <option value="airQuality">Air quality</option>
            <option value="transitScore">Transit</option>
            <option value="greenSpace">Green space</option>
            <option value="noise">Quietness</option>
          </Select>
        </label>
      </div>
    </form>
  );
}
