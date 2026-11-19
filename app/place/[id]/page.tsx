import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlace } from "@/features/place/api/get-place";
import { MetricPanel } from "@/features/place/components/metric-panel";
import { PlaceHeader } from "@/features/place/components/place-header";
import { TrendChart } from "@/features/place/components/trend-chart";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const place = await getPlace(id);

  if (!place) {
    return { title: "Place not found" };
  }

  return {
    title: place.name,
    description: place.summary,
  };
}

export default async function PlacePage({ params }: Props) {
  const { id } = await params;
  const place = await getPlace(id);

  if (!place) {
    notFound();
  }

  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10">
        <PlaceHeader place={place} />
        <MetricPanel place={place} />
        <TrendChart place={place} />
      </div>
    </main>
  );
}