"use client";

import Link from "next/link";
import { buttonBaseClassName, buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: Props) {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center px-6 py-16 sm:px-10">
      <p className="text-sm font-semibold tracking-[0.16em] text-accent uppercase">
        Something went wrong
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground">
        We couldn’t load this page
      </h1>
      <p className="mt-4 text-muted">
        Try again, or head back to explore neighborhoods.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className={cn(buttonBaseClassName, buttonVariants.primary)}
        >
          Try again
        </button>
        <Link
          href="/explore"
          className={cn(buttonBaseClassName, buttonVariants.secondary)}
        >
          Back to explore
        </Link>
      </div>
    </main>
  );
}
