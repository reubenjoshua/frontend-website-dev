import Link from "next/link";
import type { Place } from "@/features/place/types";

type Props = {
  place: Place;
};

export function PlaceHeader({ place }: Props) {
  return (
    <header className="max-w-3xl">
      <Link
        href="/explore"
        className="text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        ← Back to explore
      </Link>

      <p className="mt-6 text-sm font-semibold tracking-[0.18em] text-accent uppercase">
        {place.district}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {place.name}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{place.summary}</p>
    </header>
  );
}