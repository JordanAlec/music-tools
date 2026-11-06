import { rotate } from "../circular";
import { MAJOR_TRIAD_QUALITIES, type TriadQuality } from "./chords";

export interface Mode {
  name: string;
  degree: number;
  tonic: string;
  quality: TriadQuality;
  notes: string[];
}

export const MAJOR_MODE_NAMES = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];

export const HARMONIC_MINOR_MODE_NAMES = [
  "Harmonic minor",
  "Locrian ♮6",
  "Ionian ♯5",
  "Dorian ♯4",
  "Phrygian dominant",
  "Lydian ♯2",
  "Super Locrian 𝄫7",
];

export const MELODIC_MINOR_MODE_NAMES = [
  "Melodic minor",
  "Dorian ♭2",
  "Lydian augmented",
  "Lydian dominant",
  "Mixolydian ♭6",
  "Locrian ♮2",
  "Super Locrian",
];

// Each mode's quality is the triad built on its tonic.
export function scaleModes(scale: string[], names: string[], qualities: TriadQuality[]): Mode[] {
  return names.map((name, degree) => ({
    name,
    degree: degree + 1,
    tonic: scale[degree],
    quality: qualities[degree],
    notes: rotate(scale, degree),
  }));
}

export function majorModes(scale: string[]): Mode[] {
  return scaleModes(scale, MAJOR_MODE_NAMES, MAJOR_TRIAD_QUALITIES);
}
