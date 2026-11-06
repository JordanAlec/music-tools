import type { Metadata } from "next";
import BackLink from "../components/back-link";
import BackToTop from "../components/back-to-top";
import ModeExplorer from "../components/mode-explorer/mode-explorer";

export const metadata: Metadata = {
  title: "Mode Explorer",
  description: "Every mode of the major, harmonic minor and melodic minor scales on any tonic.",
};

export default function ModeExplorerPage() {
  return (
    <div className="space-y-6">
      <BackLink />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Mode Explorer</h1>
        <p className="text-neutral-500">
          Pick a mode and a tonic to see its parent key, its formula against the major scale, and the chords built from
          it.
        </p>
      </div>
      <ModeExplorer />
      <BackToTop />
    </div>
  );
}
