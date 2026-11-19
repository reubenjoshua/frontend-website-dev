import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#c5dde0_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_left,_#d9e4ef_0%,_transparent_50%),linear-gradient(180deg,_#e8eef4_0%,_#f0f4f8_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(11,31,42,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,42,0.06)_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 py-16 sm:px-10">
        <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.2em] text-accent uppercase">
          City Pulse
        </p>

        <h1 className="mt-6 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-tight font-semibold tracking-tight text-foreground sm:text-6xl">
          Read your city in clearer signals.
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          Explore neighborhoods through air quality, transit, green space, and
          noise — open data, made readable.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-4"
          role="group"
          aria-label="Get started"
        >
          <Link
            href="/explore"
            className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-base font-semibold text-accent-foreground transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Explore neighborhoods
          </Link>
          <Link
            href="/explore?sort=airQuality"
            className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-surface/70 px-6 text-base font-medium text-foreground backdrop-blur transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Sort by air quality
          </Link>
        </div>
      </div>
    </main>
  );
}