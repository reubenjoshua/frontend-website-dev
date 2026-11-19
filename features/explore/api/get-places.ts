import { places } from "@/shared/data/places";
import type { District, Place, PlaceSort } from "@/features/explore/types";

export type GetPlacesParams = {
  district?: District | "all";
  sort?: PlaceSort;
  q?: string;
};

function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getPlaces(params: GetPlacesParams = {}): Promise<Place[]> {
  await delay();

  const { district = "all", sort = "name", q = "" } = params;
  const query = q.trim().toLowerCase();

  let result = [...places];

  if (district !== "all") {
    result = result.filter((place) => place.district === district);
  }

  if (query) {
    result = result.filter(
      (place) =>
        place.name.toLowerCase().includes(query) ||
        place.summary.toLowerCase().includes(query),
    );
  }

  result.sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    return b[sort] - a[sort];
  });

  return result;
}