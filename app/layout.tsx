import type { Metadata } from "next";
import Link from "next/link";
import { Outfit, Source_Sans_3 } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/shared/providers/query-provider";
import "./globals.css";

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "City Pulse",
    template: "%s · City Pulse",
  },
  description: "Explore your city through open data.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to main content
        </a>

        <header className="border-b border-border/80 bg-surface/80 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
            <Link
              href="/"
              className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.18em] text-foreground uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              City Pulse
            </Link>
            <nav aria-label="Primary">
              <Link
                href="/explore"
                className="text-sm font-medium text-muted transition hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Explore
              </Link>
            </nav>
          </div>
        </header>

        <div id="main-content" className="flex flex-1 flex-col">
          <NuqsAdapter>
            <QueryProvider>{children}</QueryProvider>
          </NuqsAdapter>
        </div>
      </body>
    </html>
  );
}
