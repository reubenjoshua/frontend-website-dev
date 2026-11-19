import type { Place } from "@/features/place/types";
import { formatScore } from "@/shared/lib/format";

type Props = {
  place: Place;
};

const metrics = [
  { key: "airQuality", label: "Air quality", hint: "Higher is cleaner" },
  { key: "transitScore", label: "Transit", hint: "Access and frequency" },
  { key: "greenSpace", label: "Green space", hint: "Parks and canopy" },
  { key: "noise", label: "Quietness", hint: "Higher is quieter" },
] as const;

export function MetricPanel({ place }: Props) {
  return (
    <section aria-labelledby="metrics-heading" className="mt-10">
      <h2
        id="metrics-heading"
        className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground"
      >
        Livability metrics
      </h2>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {metrics.map((metric) => {
          const value = place[metric.key];
          return (
            <div
              key={metric.key}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <dt className="text-sm font-medium text-foreground">
                {metric.label}
              </dt>
              <dd className="mt-2 text-3xl font-semibold text-accent">
                {formatScore(value)}
              </dd>
              <p className="mt-2 text-sm text-muted">{metric.hint}</p>
              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-border"
                aria-hidden="true"
              >
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
}