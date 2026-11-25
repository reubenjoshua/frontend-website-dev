"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQueryState, parseAsString } from "nuqs";
import type { Place } from "@/features/explore/types";
import { PRESET_DISTRICTS } from "@/features/explore/types";
import { usePlaces } from "@/shared/providers/places-provider";
import { formatScore } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";
import { Button, buttonBaseClassName, buttonVariants } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { ProvenanceBadge } from "@/shared/ui/provenance-badge";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function MetricSlider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex flex-col gap-2.5 text-sm">
      <span className="flex items-baseline justify-between gap-3">
        <span className="font-medium text-foreground">{label}</span>
        <span className="tabular-nums text-base font-semibold text-accent">
          {formatScore(value)}
        </span>
      </span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-border accent-accent"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      />
      <div
        className="h-1.5 overflow-hidden rounded-full bg-border/70"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-150"
          style={{ width: `${value}%` }}
        />
      </div>
    </label>
  );
}

function SignalPreview({ place }: { place: Place }) {
  const metrics = [
    { label: "Air", value: place.airQuality },
    { label: "Transit", value: place.transitScore },
    { label: "Green", value: place.greenSpace },
    { label: "Quiet", value: place.noise },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="min-w-0">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {metric.label}
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold tabular-nums text-foreground">
            {formatScore(metric.value)}
          </p>
          <div
            className="mt-2 h-1 overflow-hidden rounded-full bg-border/80"
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${metric.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EditorView() {
  const { places, districts, updatePlace, addPlace, resetPlaces, ready } =
    usePlaces();
  const [selectedId, setSelectedId] = useQueryState(
    "place",
    parseAsString.withDefault(""),
  );
  const [status, setStatus] = useState<string | null>(null);
  const [mode, setMode] = useState<"update" | "create">("update");

  const selected =
    places.find((place) => place.id === selectedId) ?? places[0] ?? null;

  const [draft, setDraft] = useState<Place | null>(null);
  const [draftSourceId, setDraftSourceId] = useState<string | null>(null);

  if (selected && selected.id !== draftSourceId) {
    setDraftSourceId(selected.id);
    setDraft({ ...selected, trend: [...selected.trend] });
  }

  const [newName, setNewName] = useState("");
  const [newDistrictMode, setNewDistrictMode] = useState<"existing" | "new">(
    "existing",
  );
  const [newDistrict, setNewDistrict] = useState(districts[0] ?? "north");
  const [customDistrict, setCustomDistrict] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newSource, setNewSource] = useState("City Open Data Portal");
  const [newMetrics, setNewMetrics] = useState({
    airQuality: 70,
    transitScore: 70,
    greenSpace: 70,
    noise: 70,
  });

  const districtOptions = useMemo(() => {
    return Array.from(
      new Set([...PRESET_DISTRICTS, ...districts].map((item) => item)),
    ).sort((a, b) => a.localeCompare(b));
  }, [districts]);

  if (!ready || !selected || !draft) {
    return (
      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
        <div className="h-10 w-56 rounded bg-accent-soft motion-safe:animate-pulse" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <div className="h-64 rounded-xl bg-accent-soft/70 motion-safe:animate-pulse" />
          <div className="h-80 rounded-xl bg-accent-soft/70 motion-safe:animate-pulse" />
        </div>
      </div>
    );
  }

  function saveSelected(current: Place) {
    updatePlace(current.id, {
      airQuality: current.airQuality,
      transitScore: current.transitScore,
      greenSpace: current.greenSpace,
      noise: current.noise,
      source: current.source,
      summary: current.summary,
      district: current.district,
      trend: [...current.trend.slice(0, -1), current.airQuality],
      updatedAt: new Date().toISOString(),
    });
    setDraftSourceId(null);
    setStatus(`Updated ${current.name} from ${current.source}.`);
  }

  function createPlace() {
    const districtValue =
      newDistrictMode === "new" ? customDistrict.trim() : newDistrict.trim();
    const name = newName.trim();
    if (!name || !districtValue) {
      setStatus("Name and district are required.");
      return;
    }

    const id = slugify(name) || `place-${Date.now()}`;
    const place: Place = {
      id,
      name,
      district: districtValue,
      summary: newSummary.trim() || `Signals for ${name}.`,
      airQuality: newMetrics.airQuality,
      transitScore: newMetrics.transitScore,
      greenSpace: newMetrics.greenSpace,
      noise: newMetrics.noise,
      trend: [
        Math.max(0, newMetrics.airQuality - 6),
        Math.max(0, newMetrics.airQuality - 4),
        Math.max(0, newMetrics.airQuality - 2),
        newMetrics.airQuality,
      ],
      updatedAt: new Date().toISOString(),
      source: newSource.trim() || "City Open Data Portal",
    };

    addPlace(place);
    void setSelectedId(place.id);
    setMode("update");
    setStatus(`Added ${place.name} in ${place.district}.`);
    setNewName("");
    setNewSummary("");
    setCustomDistrict("");
  }

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top_right,_rgba(15,122,107,0.1)_0%,_transparent_55%)]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-accent uppercase">
            Editor
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Encode and refresh city signals
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Pick a neighborhood, tune the four livability scores, and keep
            provenance visible so people know when signals were refreshed.
          </p>
        </header>

        {status ? (
          <p
            className="mt-6 border-l-4 border-accent bg-accent-soft/70 px-4 py-3 text-sm text-foreground"
            role="status"
          >
            {status}
          </p>
        ) : null}

        <div className="mt-10 grid gap-8 lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-10">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
                Places
              </h2>
              <button
                type="button"
                onClick={() => setMode("create")}
                className="cursor-pointer text-sm font-semibold text-accent transition duration-200 hover:text-[#0c6558] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                + Add
              </button>
            </div>

            <ul className="mt-3 max-h-[28rem] space-y-1 overflow-y-auto pr-1">
              {places.map((place) => {
                const active = mode === "update" && place.id === selected.id;
                return (
                  <li key={place.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setMode("update");
                        void setSelectedId(place.id);
                      }}
                      className={cn(
                        "flex w-full cursor-pointer flex-col rounded-lg px-3 py-2.5 text-left transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        active
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground hover:bg-accent-soft",
                      )}
                      aria-current={active ? "true" : undefined}
                    >
                      <span className="truncate text-sm font-semibold">
                        {place.name}
                      </span>
                      <span
                        className={cn(
                          "truncate text-xs capitalize",
                          active ? "text-accent-foreground/80" : "text-muted",
                        )}
                      >
                        {place.district}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => {
                resetPlaces();
                setDraftSourceId(null);
                setMode("update");
                setStatus("Reset to seed city data.");
              }}
              className="mt-4 cursor-pointer text-left text-sm font-medium text-muted transition duration-200 hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Reset demo data
            </button>
          </aside>

          <section className="min-w-0">
            {mode === "update" ? (
              <div className="space-y-8">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/80 pb-6">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                      {draft.district}
                    </p>
                    <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground">
                      {draft.name}
                    </h2>
                    <ProvenanceBadge
                      className="mt-3"
                      updatedAt={draft.updatedAt}
                      source={draft.source}
                    />
                  </div>
                  <Link
                    href={`/place/${draft.id}`}
                    className={cn(buttonBaseClassName, buttonVariants.secondary)}
                  >
                    View place
                  </Link>
                </div>

                <SignalPreview place={draft} />

                <div className="grid gap-6 sm:grid-cols-2">
                  <MetricSlider
                    label="Air quality"
                    value={draft.airQuality}
                    onChange={(airQuality) => setDraft({ ...draft, airQuality })}
                  />
                  <MetricSlider
                    label="Transit"
                    value={draft.transitScore}
                    onChange={(transitScore) =>
                      setDraft({ ...draft, transitScore })
                    }
                  />
                  <MetricSlider
                    label="Green space"
                    value={draft.greenSpace}
                    onChange={(greenSpace) => setDraft({ ...draft, greenSpace })}
                  />
                  <MetricSlider
                    label="Quietness"
                    value={draft.noise}
                    onChange={(noise) => setDraft({ ...draft, noise })}
                  />
                </div>

                <div className="grid gap-4 border-t border-border/80 pt-6">
                  <label className="flex flex-col gap-2 text-sm">
                    <span className="font-medium text-foreground">Source</span>
                    <Input
                      value={draft.source}
                      onChange={(event) =>
                        setDraft({ ...draft, source: event.target.value })
                      }
                      placeholder="City Open Data Portal"
                      className="bg-surface"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-sm">
                    <span className="font-medium text-foreground">Summary</span>
                    <Input
                      value={draft.summary}
                      onChange={(event) =>
                        setDraft({ ...draft, summary: event.target.value })
                      }
                      className="bg-surface"
                    />
                  </label>
                </div>

                <Button type="button" onClick={() => saveSelected(draft)}>
                  Save updates
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border-b border-border/80 pb-6">
                  <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
                    New place
                  </p>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground">
                    Add to City Pulse
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-muted">
                    Encode a neighborhood into the explorer, including a new
                    district when needed.
                  </p>
                </div>

                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-foreground">Place name</span>
                  <Input
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                    placeholder="River Bend"
                    className="bg-surface"
                  />
                </label>

                <fieldset>
                  <legend className="text-sm font-medium text-foreground">
                    District
                  </legend>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setNewDistrictMode("existing")}
                      aria-pressed={newDistrictMode === "existing"}
                      className={cn(
                        "cursor-pointer rounded-lg px-3.5 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        newDistrictMode === "existing"
                          ? "bg-accent text-accent-foreground"
                          : "bg-surface text-muted ring-1 ring-border hover:text-accent",
                      )}
                    >
                      Existing
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewDistrictMode("new")}
                      aria-pressed={newDistrictMode === "new"}
                      className={cn(
                        "cursor-pointer rounded-lg px-3.5 py-2 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                        newDistrictMode === "new"
                          ? "bg-accent text-accent-foreground"
                          : "bg-surface text-muted ring-1 ring-border hover:text-accent",
                      )}
                    >
                      New district
                    </button>
                  </div>
                  <div className="mt-3">
                    {newDistrictMode === "existing" ? (
                      <Select
                        value={newDistrict}
                        onChange={(event) => setNewDistrict(event.target.value)}
                        className="bg-surface"
                      >
                        {districtOptions.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        value={customDistrict}
                        onChange={(event) =>
                          setCustomDistrict(event.target.value)
                        }
                        placeholder="harbor-isles"
                        className="bg-surface"
                      />
                    )}
                  </div>
                </fieldset>

                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-foreground">Summary</span>
                  <Input
                    value={newSummary}
                    onChange={(event) => setNewSummary(event.target.value)}
                    placeholder="Short livability summary"
                    className="bg-surface"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm">
                  <span className="font-medium text-foreground">Source</span>
                  <Input
                    value={newSource}
                    onChange={(event) => setNewSource(event.target.value)}
                    className="bg-surface"
                  />
                </label>

                <div className="grid gap-6 sm:grid-cols-2">
                  <MetricSlider
                    label="Air quality"
                    value={newMetrics.airQuality}
                    onChange={(airQuality) =>
                      setNewMetrics((current) => ({ ...current, airQuality }))
                    }
                  />
                  <MetricSlider
                    label="Transit"
                    value={newMetrics.transitScore}
                    onChange={(transitScore) =>
                      setNewMetrics((current) => ({ ...current, transitScore }))
                    }
                  />
                  <MetricSlider
                    label="Green space"
                    value={newMetrics.greenSpace}
                    onChange={(greenSpace) =>
                      setNewMetrics((current) => ({ ...current, greenSpace }))
                    }
                  />
                  <MetricSlider
                    label="Quietness"
                    value={newMetrics.noise}
                    onChange={(noise) =>
                      setNewMetrics((current) => ({ ...current, noise }))
                    }
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button type="button" onClick={createPlace}>
                    Add to City Pulse
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setMode("update")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
