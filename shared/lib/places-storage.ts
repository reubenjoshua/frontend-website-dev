import { places as seedPlaces } from "@/shared/data/places";
import { placesSchema } from "@/shared/lib/place-schema";
import type { Place } from "@/features/explore/types";

export const PLACES_STORAGE_KEY = "city-pulse.places.v1";

export function readStoredPlaces(): Place[] | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(PLACES_STORAGE_KEY);
    if (!raw) return null;
    return placesSchema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function writeStoredPlaces(next: Place[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PLACES_STORAGE_KEY, JSON.stringify(next));
}

export function getSeedPlaces(): Place[] {
  return seedPlaces.map((place) => ({ ...place, trend: [...place.trend] }));
}
