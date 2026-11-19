"use client";

import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import type { PlaceSort } from "@/features/explore/types";

const sorts = [
  "name",
  "airQuality",
  "transitScore",
  "greenSpace",
  "noise",
] as const satisfies PlaceSort[];

export type ExploreDistrict = string;

export function useExploreFilters() {
  return useQueryStates({
    district: parseAsString.withDefault("all"),
    sort: parseAsStringEnum<PlaceSort>([...sorts]).withDefault("name"),
    q: parseAsString.withDefault(""),
  });
}
