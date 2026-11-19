import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { PlacesProvider } from "@/shared/providers/places-provider";
import { QueryProvider } from "@/shared/providers/query-provider";
import { SiteHeader } from "@/shared/ui/site-header";
import "./globals.css";

const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

        <SiteHeader />

        <div id="main-content" className="flex flex-1 flex-col">
          <NuqsAdapter>
            <QueryProvider>
              <PlacesProvider>{children}</PlacesProvider>
            </QueryProvider>
          </NuqsAdapter>
        </div>
      </body>
    </html>
  );
}
