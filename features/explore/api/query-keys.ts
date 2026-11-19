export const placeKeys = {
  all: ["places"] as const,
  list: (params: Record<string, unknown>) =>
    ["places", "list", params] as const,
  detail: (id: string) => ["places", "detail", id] as const,
};
