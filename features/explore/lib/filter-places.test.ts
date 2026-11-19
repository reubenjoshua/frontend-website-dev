import { describe, expect, it } from "vitest";
import type { Place } from "@/features/explore/types";
import { filterPlaces } from "./filter-places";

const samplePlaces: Place[] = [
  {
    id: "alpha",
    name: "Alpha Park",
    district: "north",
    summary: "Quiet green streets",
    airQuality: 90,
    transitScore: 40,
    greenSpace: 95,
    noise: 88,
    trend: [80, 85, 90],
    updatedAt: "2026-03-01T00:00:00.000Z",
    source: "City Open Data Portal",
  },
  {
    id: "bravo",
    name: "Bravo Docks",
    district: "south",
    summary: "Busy transit hub",
    airQuality: 55,
    transitScore: 92,
    greenSpace: 20,
    noise: 30,
    trend: [50, 52, 55],
    updatedAt: "2026-03-01T00:00:00.000Z",
    source: "City Open Data Portal",
  },
  {
    id: "charlie",
    name: "Charlie Canal",
    district: "east",
    summary: "Waterfront green space",
    airQuality: 70,
    transitScore: 75,
    greenSpace: 80,
    noise: 60,
    trend: [65, 68, 70],
    updatedAt: "2026-03-01T00:00:00.000Z",
    source: "City Open Data Portal",
  },
];

describe("filterPlaces", () => {
  it("filters by district", () => {
    const result = filterPlaces(samplePlaces, { district: "north" });
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("alpha");
  });

  it("filters by search query across name and summary", () => {
    const byName = filterPlaces(samplePlaces, { q: "canal" });
    expect(byName.map((place) => place.id)).toEqual(["charlie"]);

    const bySummary = filterPlaces(samplePlaces, { q: "transit" });
    expect(bySummary.map((place) => place.id)).toEqual(["bravo"]);
  });

  it("sorts by metric descending and by name ascending", () => {
    const byTransit = filterPlaces(samplePlaces, { sort: "transitScore" });
    expect(byTransit.map((place) => place.id)).toEqual([
      "bravo",
      "charlie",
      "alpha",
    ]);

    const byName = filterPlaces(samplePlaces, { sort: "name" });
    expect(byName.map((place) => place.id)).toEqual([
      "alpha",
      "bravo",
      "charlie",
    ]);
  });

  it("combines district, query, and sort", () => {
    const result = filterPlaces(samplePlaces, {
      district: "east",
      q: "green",
      sort: "airQuality",
    });
    expect(result.map((place) => place.id)).toEqual(["charlie"]);
  });
});
