import { places } from "@/shared/data/places";
import type { Place } from "@/features/explore/types";
import {
  filterPlaces,
  type FilterPlacesParams,
} from "@/features/explore/lib/filter-places";

export type GetPlacesParams = FilterPlacesParams;

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getPlaces(params: GetPlacesParams = {}): Promise<Place[]> {
  await delay();
  return filterPlaces(places, params);
}
