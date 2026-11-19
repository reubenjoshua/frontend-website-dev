import type { Metadata } from "next";
import { Suspense } from "react";
import { EditorView } from "@/features/editor/components/editor-view";

export const metadata: Metadata = {
  title: "Editor",
  description: "Update and encode city livability signals.",
};

function EditorFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10">
      <div className="h-10 w-64 rounded bg-accent-soft motion-safe:animate-pulse" />
      <div className="mt-6 h-24 w-full max-w-2xl rounded bg-accent-soft/80 motion-safe:animate-pulse" />
    </div>
  );
}

export default function EditorPage() {
  return (
    <main className="min-h-svh bg-background">
      <Suspense fallback={<EditorFallback />}>
        <EditorView />
      </Suspense>
    </main>
  );
}
