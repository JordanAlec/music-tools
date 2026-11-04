"use client";

import { useState } from "react";
import { CIRCLE_OF_FIFTHS, wheelLabels } from "@/lib/music/circle-of-fifths";
import { signatureSymbol } from "@/lib/music/key-signature";
import CircleWheel from "./circle-wheel";
import KeyDetails from "./key-details";
import WheelControls from "./wheel-controls";
import { useWheelRotation } from "./use-wheel-rotation";

export default function CircleOfFifths() {
  const { steps, position, rotation, isDragging, rotateBy, rotateTo, reset, wheelHandlers } = useWheelRotation(
    CIRCLE_OF_FIFTHS.length,
  );
  // Tied to the rotation step so any rotation, including reset, returns to the conventional spelling.
  const [swappedAtStep, setSwappedAtStep] = useState<number | null>(null);
  const isSwapped = swappedAtStep === steps;

  const spellings = CIRCLE_OF_FIFTHS[position];
  const selected = spellings[isSwapped ? 1 : 0];
  const enharmonic = spellings.find((spelling) => spelling !== selected);

  return (
    <div className="flex flex-col items-center gap-6">
      <CircleWheel
        labels={wheelLabels(position, selected)}
        centreLabel={signatureSymbol(selected.signature)}
        position={position}
        rotation={rotation}
        animate={!isDragging}
        onSegmentSelect={rotateTo}
        {...wheelHandlers}
      />
      <WheelControls onFourth={() => rotateBy(-1)} onFifth={() => rotateBy(1)} onReset={reset} />
      <KeyDetails
        details={selected}
        enharmonic={enharmonic}
        onEnharmonicSwap={() => setSwappedAtStep(isSwapped ? null : steps)}
      />
    </div>
  );
}
