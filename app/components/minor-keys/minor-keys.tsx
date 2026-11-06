"use client";

import { useState } from "react";
import { describeSignature } from "@/lib/music/key-signature";
import { MINOR_KEYS } from "@/lib/music/minor-keys";
import KeySignatureSummary from "../key-signature-summary";
import MinorKeyPicker from "./minor-key-picker";
import MinorScaleSection from "./minor-scale-section";

export default function MinorKeys() {
  const [selected, setSelected] = useState(MINOR_KEYS[0]);
  const { tonic, relativeMajor, signature, natural, harmonic, melodic } = selected;

  return (
    <div className="space-y-8">
      <MinorKeyPicker keys={MINOR_KEYS} selected={selected} onSelect={setSelected} />
      <header aria-live="polite" className="text-center">
        <h2 className="text-xl font-semibold">{tonic} minor</h2>
        <p className="text-sm text-neutral-500">
          Relative major: {relativeMajor} ({describeSignature(signature)})
        </p>
      </header>
      <KeySignatureSummary signature={signature} />
      <MinorScaleSection
        scale={natural}
        description={`Shares its notes with ${relativeMajor} major, so its modes are the ${relativeMajor} major modes starting from Aeolian.`}
        modesTitle={`Modes of ${tonic} natural minor (${relativeMajor} major)`}
      />
      <MinorScaleSection
        scale={harmonic}
        description="Raises the 7th to give a leading tone, a major V and a diminished vii°7."
      />
      <MinorScaleSection
        scale={melodic}
        description="Raises the 6th and 7th when ascending. Descending, it usually returns to the natural minor."
      />
    </div>
  );
}
