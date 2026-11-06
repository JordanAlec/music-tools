import type { Metadata } from "next";
import BackLink from "../components/back-link";
import BackToTop from "../components/back-to-top";
import MinorKeys from "../components/minor-keys/minor-keys";

export const metadata: Metadata = {
  title: "Minor Keys",
  description: "Every minor key with its natural, harmonic and melodic minor scales, chords and modes.",
};

export default function MinorKeysPage() {
  return (
    <div className="space-y-6">
      <BackLink />
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Minor Keys</h1>
        <p className="text-neutral-500">
          Pick a minor key to see its notes, chords and modes, then how the harmonic and melodic minor change them.
        </p>
      </div>
      <MinorKeys />
      <BackToTop />
    </div>
  );
}
