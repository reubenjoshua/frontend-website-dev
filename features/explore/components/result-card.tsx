import Link from "next/link";
import type { Place } from "@/features/explore/types";
import { formatScore } from "@/shared/lib/format";

type Props = {
  place: Place;
};

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-wide text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-base font-semibold text-foreground">
        {formatScore(value)}
      </dd>
      <div
        className="mt-2 h-1 overflow-hidden rounded-full bg-border"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-accent/70"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function ResultCard({ place }: Props) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent/40 hover:bg-accent-soft/40 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
            <Link
              href={`/place/${place.id}`}
              className="rounded-sm outline-none transition hover:text-accent focus-visible:ring-2 focus-visible:ring-ring"
            >
              {place.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm capitalize text-muted">{place.district}</p>
        </div>
      </div>

      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
        {place.summary}
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Metric label="Air" value={place.airQuality} />
        <Metric label="Transit" value={place.transitScore} />
        <Metric label="Green" value={place.greenSpace} />
        <Metric label="Quiet" value={place.noise} />
      </dl>
    </article>
  );
}
