import { places } from "@/shared/data/places";
import type { Place } from "@/features/place/types";

function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getPlace(id: string): Promise<Place | null> {
  await delay();
  return places.find((place) => place.id === id) ?? null;
}