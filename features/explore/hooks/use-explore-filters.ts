"use client";

import {
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from "nuqs";
import type { District, PlaceSort } from "@/features/explore/types";

const districts = ["all", "north", "south", "east", "west", "central"] as const;
const sorts = [
  "name",
  "airQuality",
  "transitScore",
  "greenSpace",
  "noise",
] as const satisfies PlaceSort[];

export type ExploreDistrict = District | "all";

export function useExploreFilters() {
  return useQueryStates({
    district: parseAsStringEnum<ExploreDistrict>([...districts]).withDefault(
      "all",
    ),
    sort: parseAsStringEnum<PlaceSort>([...sorts]).withDefault("name"),
    q: parseAsString.withDefault(""),
  });
}