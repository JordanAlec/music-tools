import { mod } from "../circular";

export interface ScaleDegree {
  label: string;
  name: string;
  isAltered: boolean;
}

const OCTAVE = 12;

// Semitones above C, which are also the major scale's steps above its root.
const LETTER_SEMITONES: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const MAJOR_STEPS = Object.values(LETTER_SEMITONES);

const ACCIDENTAL_OFFSETS: Record<string, number> = { "": 0, "♯": 1, "♭": -1, "𝄪": 2, "𝄫": -2 };
const ALTERATION_SYMBOLS: Record<number, string> = { [-2]: "𝄫", [-1]: "♭", 0: "", 1: "♯", 2: "𝄪" };

const PERFECT_DEGREES = [1, 4, 5];
const PERFECT_QUALITIES: Record<number, string> = { [-1]: "Diminished", 0: "Perfect", 1: "Augmented" };
const IMPERFECT_QUALITIES: Record<number, string> = { [-2]: "Diminished", [-1]: "Minor", 0: "Major", 1: "Augmented" };
const ORDINALS = ["Root", "2nd", "3rd", "4th", "5th", "6th", "7th"];

function semitone(note: string): number {
  return LETTER_SEMITONES[note[0]] + ACCIDENTAL_OFFSETS[note.slice(1)];
}

function intervalName(degree: number, alteration: number): string {
  const ordinal = ORDINALS[degree - 1];
  if (degree === 1) return ordinal;
  const qualities = PERFECT_DEGREES.includes(degree) ? PERFECT_QUALITIES : IMPERFECT_QUALITIES;
  return `${qualities[alteration]} ${ordinal}`;
}

// Compares each note to the major scale on the same root, e.g. Dorian is 1 2 ♭3 4 5 6 ♭7.
export function scaleDegrees(scale: string[]): ScaleDegree[] {
  const root = semitone(scale[0]);
  return scale.map((note, index) => {
    const degree = index + 1;
    const interval = mod(semitone(note) - root, OCTAVE);
    const alteration = mod(interval - MAJOR_STEPS[index] + OCTAVE / 2, OCTAVE) - OCTAVE / 2;
    return {
      label: `${ALTERATION_SYMBOLS[alteration]}${degree}`,
      name: intervalName(degree, alteration),
      isAltered: alteration !== 0,
    };
  });
}

const STEP_NAMES: Record<number, string> = { 1: "H", 2: "W", 3: "W+H" };

// Whole and half steps between neighbouring notes, ending back on the octave.
export function stepPattern(scale: string[]): string[] {
  return scale.map((note, index) => {
    const next = scale[(index + 1) % scale.length];
    return STEP_NAMES[mod(semitone(next) - semitone(note), OCTAVE)];
  });
}
