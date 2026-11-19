import { cacheLife, cacheTag } from "next/cache";
import { places } from "@/shared/data/places";
import type { Place } from "@/features/place/types";

export async function getPlace(id: string): Promise<Place | null> {
  "use cache";
  cacheTag("places", `place-${id}`);
  cacheLife("hours");

  return places.find((place) => place.id === id) ?? null;
}
