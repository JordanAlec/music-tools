export type Accidental = "sharp" | "flat";

export interface KeySignature {
  accidental: Accidental | null;
  notes: string[];
}

const SHARP_ORDER = ["F♯", "C♯", "G♯", "D♯", "A♯", "E♯", "B♯"];
const FLAT_ORDER = ["B♭", "E♭", "A♭", "D♭", "G♭", "C♭", "F♭"];

export const ACCIDENTAL_SYMBOLS: Record<Accidental, string> = {
  sharp: "♯",
  flat: "♭",
};

// Positive values count sharps, negative values count flats.
export function keySignature(fifths: number): KeySignature {
  if (fifths > 0) return { accidental: "sharp", notes: SHARP_ORDER.slice(0, fifths) };
  if (fifths < 0) return { accidental: "flat", notes: FLAT_ORDER.slice(0, -fifths) };
  return { accidental: null, notes: [] };
}

export function signatureSymbol({ accidental, notes }: KeySignature): string {
  return accidental ? `${notes.length}${ACCIDENTAL_SYMBOLS[accidental]}` : "0";
}

export function describeSignature({ accidental, notes }: KeySignature): string {
  if (!accidental) return "No sharps or flats";
  return `${notes.length} ${accidental}${notes.length === 1 ? "" : "s"}`;
}
