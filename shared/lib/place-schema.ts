import { z } from "zod";

export const districtSchema = z.enum([
  "north",
  "south",
  "east",
  "west",
  "central",
]);

export const placeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  district: districtSchema,
  summary: z.string().min(1),
  airQuality: z.number().min(0).max(100),
  transitScore: z.number().min(0).max(100),
  greenSpace: z.number().min(0).max(100),
  noise: z.number().min(0).max(100),
  trend: z.array(z.number().min(0).max(100)).min(1),
});

export const placesSchema = z.array(placeSchema);

export type PlaceInput = z.infer<typeof placeSchema>;
