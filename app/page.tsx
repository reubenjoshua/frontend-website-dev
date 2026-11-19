import Link from "next/link";
import {
  buttonBaseClassName,
  buttonVariants,
} from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

function SignalVisual({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[34rem] lg:mx-0",
        className,
      )}
    >
      <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(106,158,190,0.22)_0%,_rgba(106,158,190,0.06)_42%,_transparent_70%)]" />
      <div className="absolute inset-[18%] rounded-full border border-[#b7d2e4]/70" />
      <div className="absolute inset-[30%] rounded-full border border-[#9fc2d9]/60" />
      <div className="absolute inset-[42%] rounded-full border border-accent/35" />

      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full"
        fill="none"
      >
        <path
          d="M40 268C88 240 120 300 168 270C214 242 236 198 286 214C336 230 352 178 384 168"
          stroke="#9fc2d9"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="animate-rise-delay-1"
        />
        <path
          d="M28 214C84 198 118 248 170 220C222 192 248 150 302 164C348 176 366 132 392 120"
          stroke="#6a9ebe"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-rise-delay-2"
        />
        <path
          d="M52 312C104 290 138 338 188 312C236 288 262 250 312 262C350 272 368 240 390 230"
          stroke="#c5dae8"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="animate-rise"
        />

        <circle cx="168" cy="270" r="5" fill="#6a9ebe" />
        <circle cx="286" cy="214" r="4" fill="#8eb4ce" />
        <circle cx="170" cy="220" r="6" fill="#5b8faf" />
        <circle cx="302" cy="164" r="4.5" fill="#6a9ebe" />
        <circle cx="188" cy="312" r="4" fill="#9fc2d9" />

        <circle
          cx="170"
          cy="220"
          r="14"
          stroke="#6a9ebe"
          strokeOpacity="0.35"
          className="origin-center motion-safe:animate-ping"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_28%,_#e7f2f8_0%,_transparent_42%),linear-gradient(165deg,_#f8fafc_0%,_#eef5fa_48%,_#f7fafc_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(106,158,190,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(106,158,190,0.08)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_78%)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 py-14 sm:px-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-8 lg:py-10">
        <div className="max-w-xl">
          <p className="animate-rise font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            City Pulse
          </p>

          <h1 className="animate-rise-delay-1 mt-5 font-[family-name:var(--font-display)] text-4xl leading-[1.18] font-medium tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem]">
            Read your city in clearer signals.
          </h1>

          <p className="animate-rise-delay-2 mt-5 max-w-md text-lg leading-relaxed text-muted">
            Explore neighborhoods through air quality, transit, green space, and
            noise — open data, made readable.
          </p>

          <div
            className="animate-rise-delay-3 mt-9 flex flex-wrap items-center gap-3"
            role="group"
            aria-label="Get started"
          >
            <Link
              href="/explore"
              className={cn(buttonBaseClassName, buttonVariants.primary)}
            >
              Explore neighborhoods
            </Link>
            <Link
              href="/explore?sort=airQuality"
              className={cn(buttonBaseClassName, buttonVariants.secondary)}
            >
              Sort by air quality
            </Link>
          </div>
        </div>

        <div className="animate-rise-delay-2">
          <SignalVisual className="max-w-[16rem] sm:max-w-[22rem] lg:max-w-[34rem]" />
        </div>
      </div>
    </main>
  );
}
