export type District = "north" | "south" | "east" | "west" | "central";

export type Place = {
  id: string;
  name: string;
  district: District;
  summary: string;
  airQuality: number;
  transitScore: number;
  greenSpace: number;
  noise: number;
  trend: number[];
};