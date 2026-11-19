import type { GetPlacesParams } from "./get-places";

export const placeKeys = {
  all: ["places"] as const,
  list: (params: GetPlacesParams) => ["places", "list", params] as const,
  detail: (id: string) => ["places", "detail", id] as const,
};