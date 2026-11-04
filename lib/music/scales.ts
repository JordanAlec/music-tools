import type { KeySignature } from "./key-signature";

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];

export const RELATIVE_MINOR_DEGREE = 5;

export const MAJOR_DEGREE_NAMES = [
  "Tonic",
  "Supertonic",
  "Mediant",
  "Subdominant",
  "Dominant",
  "Submediant",
  "Leading tone",
];

export const MINOR_DEGREE_NAMES = [...MAJOR_DEGREE_NAMES.slice(0, 6), "Subtonic"];

export function majorScale(tonic: string, signature: KeySignature): string[] {
  const start = LETTERS.indexOf(tonic[0]);
  return LETTERS.map((_, degree) => {
    const letter = LETTERS[(start + degree) % LETTERS.length];
    return signature.notes.find((note) => note[0] === letter) ?? letter;
  });
}
