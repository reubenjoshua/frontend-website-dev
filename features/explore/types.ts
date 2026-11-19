export type District = "north" | "south" | "east" | "west" | "central";

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
};

export type PlaceSort =
  | "name"
  | "airQuality"
  | "transitScore"
  | "greenSpace"
  | "noise";