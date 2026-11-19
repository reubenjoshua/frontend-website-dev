import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPlace } from "@/features/place/api/get-place";
import { MetricPanel } from "@/features/place/components/metric-panel";
import { PlaceHeader } from "@/features/place/components/place-header";
import { TrendChart } from "@/features/place/components/trend-chart";
import { places } from "@/shared/data/places";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return places.map((place) => ({ id: place.id }));
}

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

function PlaceFallback() {
  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10">
        <div className="h-4 w-32 rounded bg-surface motion-safe:animate-pulse" />
        <div className="mt-6 h-10 w-2/3 max-w-md rounded bg-surface motion-safe:animate-pulse" />
        <div className="mt-4 h-16 w-full max-w-2xl rounded bg-surface motion-safe:animate-pulse" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-lg border border-border bg-surface motion-safe:animate-pulse"
            />
          ))}
        </div>
      </div>
    </main>
  );
}

async function PlaceContent({ params }: Props) {
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

export default function PlacePage({ params }: Props) {
  return (
    <Suspense fallback={<PlaceFallback />}>
      <PlaceContent params={params} />
    </Suspense>
  );
}
