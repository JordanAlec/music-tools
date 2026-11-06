import { rotate } from "../circular";
import { RELATIVE_MINOR_DEGREE } from "./scales";

export type TriadQuality = "major" | "minor" | "diminished" | "augmented";
export type SeventhQuality =
  | "major7"
  | "minor7"
  | "dominant7"
  | "halfDiminished7"
  | "diminished7"
  | "minorMajor7"
  | "augmentedMajor7";
export type ChordQuality = TriadQuality | SeventhQuality;

export interface Chord {
  numeral: string;
  name: string;
  quality: ChordQuality;
  notes: string[];
}

interface QualitySpelling {
  suffix: string;
  isUpperCase: boolean;
  numeralSuffix: string;
}

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"];

const TRIAD_STACK = [0, 2, 4];
const SEVENTH_STACK = [0, 2, 4, 6];

const QUALITY_SPELLINGS: Record<ChordQuality, QualitySpelling> = {
  major: { suffix: "", isUpperCase: true, numeralSuffix: "" },
  minor: { suffix: "m", isUpperCase: false, numeralSuffix: "" },
  diminished: { suffix: "°", isUpperCase: false, numeralSuffix: "°" },
  augmented: { suffix: "+", isUpperCase: true, numeralSuffix: "+" },
  major7: { suffix: "maj7", isUpperCase: true, numeralSuffix: "maj7" },
  minor7: { suffix: "m7", isUpperCase: false, numeralSuffix: "7" },
  dominant7: { suffix: "7", isUpperCase: true, numeralSuffix: "7" },
  halfDiminished7: { suffix: "m7♭5", isUpperCase: false, numeralSuffix: "ø7" },
  diminished7: { suffix: "°7", isUpperCase: false, numeralSuffix: "°7" },
  minorMajor7: { suffix: "m(maj7)", isUpperCase: false, numeralSuffix: "(maj7)" },
  augmentedMajor7: { suffix: "+maj7", isUpperCase: true, numeralSuffix: "+maj7" },
};

export const MAJOR_TRIAD_QUALITIES: TriadQuality[] = [
  "major",
  "minor",
  "minor",
  "major",
  "major",
  "minor",
  "diminished",
];

export const MAJOR_SEVENTH_QUALITIES: SeventhQuality[] = [
  "major7",
  "minor7",
  "minor7",
  "major7",
  "dominant7",
  "minor7",
  "halfDiminished7",
];

export const NATURAL_MINOR_TRIAD_QUALITIES = rotate(MAJOR_TRIAD_QUALITIES, RELATIVE_MINOR_DEGREE);
export const NATURAL_MINOR_SEVENTH_QUALITIES = rotate(MAJOR_SEVENTH_QUALITIES, RELATIVE_MINOR_DEGREE);

export const HARMONIC_MINOR_TRIAD_QUALITIES: TriadQuality[] = [
  "minor",
  "diminished",
  "augmented",
  "minor",
  "major",
  "major",
  "diminished",
];

export const HARMONIC_MINOR_SEVENTH_QUALITIES: SeventhQuality[] = [
  "minorMajor7",
  "halfDiminished7",
  "augmentedMajor7",
  "minor7",
  "dominant7",
  "major7",
  "diminished7",
];

export const MELODIC_MINOR_TRIAD_QUALITIES: TriadQuality[] = [
  "minor",
  "minor",
  "augmented",
  "major",
  "major",
  "diminished",
  "diminished",
];

export const MELODIC_MINOR_SEVENTH_QUALITIES: SeventhQuality[] = [
  "minorMajor7",
  "minor7",
  "augmentedMajor7",
  "dominant7",
  "dominant7",
  "halfDiminished7",
  "halfDiminished7",
];

function numeral(degree: number, { isUpperCase, numeralSuffix }: QualitySpelling): string {
  const roman = ROMAN_NUMERALS[degree];
  return `${isUpperCase ? roman : roman.toLowerCase()}${numeralSuffix}`;
}

function diatonicChords(scale: string[], qualities: ChordQuality[], stack: number[]): Chord[] {
  return scale.map((root, degree) => {
    const quality = qualities[degree];
    const spelling = QUALITY_SPELLINGS[quality];
    return {
      numeral: numeral(degree, spelling),
      name: `${root}${spelling.suffix}`,
      quality,
      notes: stack.map((interval) => scale[(degree + interval) % scale.length]),
    };
  });
}

export function diatonicTriads(scale: string[], qualities: TriadQuality[]): Chord[] {
  return diatonicChords(scale, qualities, TRIAD_STACK);
}

export function diatonicSevenths(scale: string[], qualities: SeventhQuality[]): Chord[] {
  return diatonicChords(scale, qualities, SEVENTH_STACK);
}
