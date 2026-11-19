export type District = string;

export type Place = {
  id: string;
  name: string;
  district: District;
  summary: string;
  airQuality: number; // 0–100 higher = better
  transitScore: number;
  greenSpace: number;
  noise: number; // 0–100 higher = quieter
  trend: number[]; // recent air-quality trend
  updatedAt: string; // ISO timestamp
  source: string; // provenance label
};

export type PlaceSort =
  | "name"
  | "airQuality"
  | "transitScore"
  | "greenSpace"
  | "noise";

export const PRESET_DISTRICTS = [
  "north",
  "south",
  "east",
  "west",
  "central",
] as const;
