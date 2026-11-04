import type { WheelLabels } from "@/lib/music/circle-of-fifths";
import WheelRing from "./wheel-ring";

const CENTRE_RADIUS = 45;

export default function CircleWheel({
  labels,
  centreLabel,
  position,
  rotation,
  animate,
  onSegmentSelect,
  ...svgProps
}: {
  labels: WheelLabels;
  centreLabel: string;
  position: number;
  rotation: number;
  animate: boolean;
  onSegmentSelect: (index: number) => void;
} & React.ComponentProps<"svg">) {
  const transitionClassName = animate ? "transition-transform duration-500 ease-out" : "";
  const ringProps = { position, rotation, transitionClassName, onSegmentSelect };

  return (
    <svg
      viewBox="-210 -210 420 420"
      role="group"
      aria-label="Circle of fifths. Drag, click a key or use the arrow keys to rotate."
      tabIndex={0}
      className="w-full max-w-md touch-none rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500"
      {...svgProps}
    >
      <g
        className={transitionClassName}
        style={{ transform: `rotate(${rotation}deg)`, transformBox: "fill-box", transformOrigin: "center" }}
      >
        <WheelRing
          {...ringProps}
          labels={labels.major}
          diatonicSpread={1}
          innerRadius={130}
          outerRadius={190}
          fontSize={22}
          idleClassName="fill-neutral-50 dark:fill-neutral-900"
        />
        <WheelRing
          {...ringProps}
          labels={labels.minor}
          diatonicSpread={1}
          innerRadius={85}
          outerRadius={130}
          fontSize={15}
          idleClassName="fill-neutral-100 dark:fill-neutral-800"
        />
        <WheelRing
          {...ringProps}
          labels={labels.diminished}
          diatonicSpread={0}
          innerRadius={CENTRE_RADIUS}
          outerRadius={85}
          fontSize={12}
          idleClassName="fill-neutral-200 dark:fill-neutral-700"
        />
      </g>
      <circle r={CENTRE_RADIUS} className="fill-white dark:fill-neutral-950" />
      <text textAnchor="middle" dominantBaseline="central" fontSize={20} className="fill-current font-semibold">
        {centreLabel}
      </text>
      <path d="M -9 -208 L 9 -208 L 0 -193 Z" className="fill-amber-500" aria-hidden />
    </svg>
  );
}
