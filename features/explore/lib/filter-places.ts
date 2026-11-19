import type { Place, PlaceSort } from "@/features/explore/types";

export type FilterPlacesParams = {
  district?: string;
  sort?: PlaceSort;
  q?: string;
};

export function filterPlaces(
  places: Place[],
  params: FilterPlacesParams = {},
): Place[] {
  const { district = "all", sort = "name", q = "" } = params;
  const query = q.trim().toLowerCase();

  let result = [...places];

  if (district !== "all") {
    result = result.filter(
      (place) => place.district.toLowerCase() === district.toLowerCase(),
    );
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
