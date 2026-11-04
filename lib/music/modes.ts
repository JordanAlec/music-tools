import { rotate } from "../circular";
import { MAJOR_TRIAD_QUALITIES, type TriadQuality } from "./chords";

export interface Mode {
  name: string;
  degree: number;
  tonic: string;
  quality: TriadQuality;
  notes: string[];
}

const MAJOR_MODE_NAMES = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];

export function majorModes(scale: string[]): Mode[] {
  return MAJOR_MODE_NAMES.map((name, degree) => ({
    name,
    degree: degree + 1,
    tonic: scale[degree],
    quality: MAJOR_TRIAD_QUALITIES[degree],
    notes: rotate(scale, degree),
  }));
}
