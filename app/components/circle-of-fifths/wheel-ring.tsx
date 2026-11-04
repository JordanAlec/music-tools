import { shortestStep } from "@/lib/circular";

type Tone = "selected" | "diatonic" | "idle";

const SEGMENT_TONES: Record<Exclude<Tone, "idle">, string> = {
  selected: "fill-amber-400 dark:fill-amber-500",
  diatonic: "fill-amber-100 dark:fill-amber-900",
};

const LABEL_TONES: Record<Tone, string> = {
  selected: "fill-neutral-950 font-bold",
  diatonic: "fill-neutral-900 font-semibold dark:fill-amber-50",
  idle: "fill-neutral-700 dark:fill-neutral-300",
};

// Rounded so server and client render identical path strings.
function polar(radius: number, degrees: number): [number, number] {
  const radians = (degrees * Math.PI) / 180;
  return [Number((radius * Math.sin(radians)).toFixed(2)), Number((-radius * Math.cos(radians)).toFixed(2))];
}

function sectorPath(inner: number, outer: number, start: number, end: number): string {
  const [x1, y1] = polar(outer, start);
  const [x2, y2] = polar(outer, end);
  const [x3, y3] = polar(inner, end);
  const [x4, y4] = polar(inner, start);
  return `M ${x1} ${y1} A ${outer} ${outer} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${inner} ${inner} 0 0 0 ${x4} ${y4} Z`;
}

export default function WheelRing({
  labels,
  position,
  diatonicSpread,
  innerRadius,
  outerRadius,
  fontSize,
  idleClassName,
  rotation,
  transitionClassName,
  onSegmentSelect,
}: {
  labels: string[];
  position: number;
  diatonicSpread: number;
  innerRadius: number;
  outerRadius: number;
  fontSize: number;
  idleClassName: string;
  rotation: number;
  transitionClassName: string;
  onSegmentSelect: (index: number) => void;
}) {
  const segmentAngle = 360 / labels.length;

  return (
    <g>
      {labels.map((label, index) => {
        const distance = Math.abs(shortestStep(position, index, labels.length));
        const tone: Tone = distance === 0 ? "selected" : distance <= diatonicSpread ? "diatonic" : "idle";
        const angle = index * segmentAngle;
        const [x, y] = polar((innerRadius + outerRadius) / 2, angle);

        return (
          <g key={index} className="cursor-pointer" onClick={() => onSegmentSelect(index)}>
            <path
              d={sectorPath(innerRadius, outerRadius, angle - segmentAngle / 2, angle + segmentAngle / 2)}
              className={`stroke-white stroke-2 transition-colors dark:stroke-neutral-950 ${tone === "idle" ? idleClassName : SEGMENT_TONES[tone]}`}
            />
            <text
              x={x}
              y={y}
              fontSize={fontSize}
              textAnchor="middle"
              dominantBaseline="central"
              className={`pointer-events-none select-none ${LABEL_TONES[tone]} ${transitionClassName}`}
              style={{ transform: `rotate(${-rotation}deg)`, transformBox: "fill-box", transformOrigin: "center" }}
            >
              {label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
