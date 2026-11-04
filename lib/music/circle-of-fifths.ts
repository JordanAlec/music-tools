import { mod, rotate, shortestStep } from "../circular";
import {
  diatonicSevenths,
  diatonicTriads,
  MAJOR_SEVENTH_QUALITIES,
  MAJOR_TRIAD_QUALITIES,
  NATURAL_MINOR_SEVENTH_QUALITIES,
  NATURAL_MINOR_TRIAD_QUALITIES,
  type Chord,
} from "./chords";
import { keySignature, type KeySignature } from "./key-signature";
import { majorModes, type Mode } from "./modes";
import { MAJOR_DEGREE_NAMES, majorScale, MINOR_DEGREE_NAMES, RELATIVE_MINOR_DEGREE } from "./scales";

export interface MusicalKey {
  tonic: string;
  scale: string[];
  degreeNames: string[];
  triads: Chord[];
  sevenths: Chord[];
}

export interface CirclePosition {
  signature: KeySignature;
  major: MusicalKey;
  minor: MusicalKey;
  diminished: Chord;
  modes: Mode[];
}

export interface WheelLabels {
  major: string[];
  minor: string[];
  diminished: string[];
}

interface CircleKey {
  tonic: string;
  fifths: number;
}

const CIRCLE_SIZE = 12;

const KEYS: CircleKey[] = [
  ...["C", "G", "D", "A", "E", "B", "F♯", "C♯"].map((tonic, fifths) => ({ tonic, fifths })),
  ...["C♭", "G♭", "D♭", "A♭", "E♭", "B♭", "F"].map((tonic, index) => ({ tonic, fifths: index - 7 })),
];

const LEADING_TONE_DEGREE = 6;

// Scale degrees of the selected key's chords one step anticlockwise, at, and one step clockwise of 12 o'clock.
const MAJOR_RING_DEGREES = [3, 0, 4];
const MINOR_RING_DEGREES = [1, 5, 2];

// Fewer accidentals first; F♯ and G♭ tie, so sharps win.
function byConvention(a: CircleKey, b: CircleKey): number {
  return Math.abs(a.fifths) - Math.abs(b.fifths) || b.fifths - a.fifths;
}

function circlePosition({ tonic, fifths }: CircleKey): CirclePosition {
  const signature = keySignature(fifths);
  const scale = majorScale(tonic, signature);
  const minorScale = rotate(scale, RELATIVE_MINOR_DEGREE);
  const majorTriads = diatonicTriads(scale, MAJOR_TRIAD_QUALITIES);

  return {
    signature,
    major: {
      tonic,
      scale,
      degreeNames: MAJOR_DEGREE_NAMES,
      triads: majorTriads,
      sevenths: diatonicSevenths(scale, MAJOR_SEVENTH_QUALITIES),
    },
    minor: {
      tonic: minorScale[0],
      scale: minorScale,
      degreeNames: MINOR_DEGREE_NAMES,
      triads: diatonicTriads(minorScale, NATURAL_MINOR_TRIAD_QUALITIES),
      sevenths: diatonicSevenths(minorScale, NATURAL_MINOR_SEVENTH_QUALITIES),
    },
    diminished: majorTriads[LEADING_TONE_DEGREE],
    modes: majorModes(scale),
  };
}

// Ordered clockwise from 12 o'clock: each step is up a fifth, each step back is up a fourth.
// Each position lists its enharmonic spellings, the conventional one first.
export const CIRCLE_OF_FIFTHS: CirclePosition[][] = Array.from({ length: CIRCLE_SIZE }, (_, position) =>
  KEYS.filter(({ fifths }) => mod(fifths, CIRCLE_SIZE) === position)
    .sort(byConvention)
    .map(circlePosition),
);

// Segments next to the selected key are spelled as that key's chords, e.g. C♭ neighbours F♭ and G♭, not E and F♯.
export function wheelLabels(position: number, selected: CirclePosition): WheelLabels {
  const ring = (degrees: number[], defaultLabel: (spelling: CirclePosition) => string) =>
    CIRCLE_OF_FIFTHS.map(([conventional], index) => {
      const offset = shortestStep(position, index, CIRCLE_SIZE);
      return Math.abs(offset) <= 1 ? selected.major.triads[degrees[offset + 1]].name : defaultLabel(conventional);
    });

  return {
    major: ring(MAJOR_RING_DEGREES, ({ major }) => major.tonic),
    minor: ring(MINOR_RING_DEGREES, ({ minor }) => minor.triads[0].name),
    diminished: CIRCLE_OF_FIFTHS.map(([conventional], index) =>
      index === position ? selected.diminished.name : conventional.diminished.name,
    ),
  };
}
