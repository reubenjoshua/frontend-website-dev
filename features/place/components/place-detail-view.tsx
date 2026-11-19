"use client";

import Link from "next/link";
import type { Place } from "@/features/place/types";
import { usePlaces } from "@/shared/providers/places-provider";
import {
  buttonBaseClassName,
  buttonVariants,
} from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { MetricPanel } from "./metric-panel";
import { PlaceHeader } from "./place-header";
import { TrendChart } from "./trend-chart";

type Props = {
  id: string;
  initialPlace: Place | null;
};

export function PlaceDetailView({ id, initialPlace }: Props) {
  const { getPlaceById, ready } = usePlaces();
  const place = getPlaceById(id) ?? initialPlace;

  if (!ready && !initialPlace) {
    return (
      <main className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
        <div className="h-4 w-32 rounded bg-accent-soft motion-safe:animate-pulse" />
        <div className="mt-8 h-12 w-2/3 max-w-md rounded bg-accent-soft motion-safe:animate-pulse" />
      </main>
    );
  }

  if (!place) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-6 py-16 sm:px-10">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold">
          Neighborhood not found
        </h1>
        <p className="mt-3 text-muted">
          That place isn’t in the City Pulse dataset.
        </p>
        <Link
          href="/explore"
          className={cn(
            buttonBaseClassName,
            buttonVariants.secondary,
            "mt-8 w-fit",
          )}
        >
          Back to explore
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top_left,_rgba(106,158,190,0.12)_0%,_transparent_55%)]"
      />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-14">
        <PlaceHeader place={place} />
        <MetricPanel place={place} />
        <TrendChart place={place} />
        <div className="mt-10">
          <Link
            href={`/editor?place=${place.id}`}
            className="text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            Update these signals in Editor
          </Link>
        </div>
      </div>
    </main>
  );
}
