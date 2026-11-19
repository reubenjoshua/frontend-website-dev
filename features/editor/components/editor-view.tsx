"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useQueryState, parseAsString } from "nuqs";
import type { Place } from "@/features/explore/types";
import { PRESET_DISTRICTS } from "@/features/explore/types";
import { usePlaces } from "@/shared/providers/places-provider";
import { Button } from "@/shared/ui/button";
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

function MetricField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      <Input
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
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
    setStatus(`Added ${place.name} in ${place.district}.`);
    setNewName("");
    setNewSummary("");
    setCustomDistrict("");
  }

  return (
    <div className="relative mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
      <header className="max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.16em] text-accent uppercase">
          Editor
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Encode and refresh city signals
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Update existing neighborhood metrics, add a district/place, and show
          provenance so residents can see when signals were refreshed.
        </p>
      </header>

      {status ? (
        <p
          className="mt-6 rounded-xl border border-accent/20 bg-accent-soft px-4 py-3 text-sm text-foreground"
          role="status"
        >
          {status}
        </p>
      ) : null}

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground">
            Update existing place
          </h2>
          <p className="mt-2 text-sm text-muted">
            City teams can refresh Air, Transit, Green, and Quietness scores.
          </p>

          <label className="mt-5 flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground">Place</span>
            <Select
              value={selected.id}
              onChange={(event) => void setSelectedId(event.target.value)}
            >
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name} ({place.district})
                </option>
              ))}
            </Select>
          </label>

          <ProvenanceBadge
            className="mt-4"
            updatedAt={draft.updatedAt}
            source={draft.source}
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <MetricField
              label="Air quality"
              value={draft.airQuality}
              onChange={(airQuality) => setDraft({ ...draft, airQuality })}
            />
            <MetricField
              label="Transit"
              value={draft.transitScore}
              onChange={(transitScore) => setDraft({ ...draft, transitScore })}
            />
            <MetricField
              label="Green space"
              value={draft.greenSpace}
              onChange={(greenSpace) => setDraft({ ...draft, greenSpace })}
            />
            <MetricField
              label="Quietness"
              value={draft.noise}
              onChange={(noise) => setDraft({ ...draft, noise })}
            />
          </div>

          <label className="mt-4 flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground">Source</span>
            <Input
              value={draft.source}
              onChange={(event) =>
                setDraft({ ...draft, source: event.target.value })
              }
              placeholder="City Open Data Portal"
            />
          </label>

          <label className="mt-4 flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground">Summary</span>
            <Input
              value={draft.summary}
              onChange={(event) =>
                setDraft({ ...draft, summary: event.target.value })
              }
            />
          </label>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button" onClick={() => saveSelected(draft)}>
              Save updates
            </Button>
            <Link
              href={`/place/${draft.id}`}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-surface px-7 text-base font-semibold text-foreground transition hover:bg-accent-soft"
            >
              View place
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground">
            Add place / district
          </h2>
          <p className="mt-2 text-sm text-muted">
            Encode a new neighborhood into the public explorer, including a new
            district when needed.
          </p>

          <label className="mt-5 flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground">Place name</span>
            <Input
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="River Bend"
            />
          </label>

          <fieldset className="mt-4">
            <legend className="text-sm font-medium text-foreground">
              District
            </legend>
            <div className="mt-2 flex flex-wrap gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="district-mode"
                  checked={newDistrictMode === "existing"}
                  onChange={() => setNewDistrictMode("existing")}
                />
                Existing
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="district-mode"
                  checked={newDistrictMode === "new"}
                  onChange={() => setNewDistrictMode("new")}
                />
                New district
              </label>
            </div>
            <div className="mt-3">
              {newDistrictMode === "existing" ? (
                <Select
                  value={newDistrict}
                  onChange={(event) => setNewDistrict(event.target.value)}
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
                  onChange={(event) => setCustomDistrict(event.target.value)}
                  placeholder="harbor-isles"
                />
              )}
            </div>
          </fieldset>

          <label className="mt-4 flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground">Summary</span>
            <Input
              value={newSummary}
              onChange={(event) => setNewSummary(event.target.value)}
              placeholder="Short livability summary"
            />
          </label>

          <label className="mt-4 flex flex-col gap-2 text-sm">
            <span className="font-medium text-foreground">Source</span>
            <Input
              value={newSource}
              onChange={(event) => setNewSource(event.target.value)}
            />
          </label>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <MetricField
              label="Air quality"
              value={newMetrics.airQuality}
              onChange={(airQuality) =>
                setNewMetrics((current) => ({ ...current, airQuality }))
              }
            />
            <MetricField
              label="Transit"
              value={newMetrics.transitScore}
              onChange={(transitScore) =>
                setNewMetrics((current) => ({ ...current, transitScore }))
              }
            />
            <MetricField
              label="Green space"
              value={newMetrics.greenSpace}
              onChange={(greenSpace) =>
                setNewMetrics((current) => ({ ...current, greenSpace }))
              }
            />
            <MetricField
              label="Quietness"
              value={newMetrics.noise}
              onChange={(noise) =>
                setNewMetrics((current) => ({ ...current, noise }))
              }
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button" onClick={createPlace}>
              Add to City Pulse
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                resetPlaces();
                setDraftSourceId(null);
                setStatus("Reset to seed city data.");
              }}
            >
              Reset demo data
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
