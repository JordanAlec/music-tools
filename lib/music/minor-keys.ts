import { rotate } from "../circular";
import {
  diatonicSevenths,
  diatonicTriads,
  HARMONIC_MINOR_SEVENTH_QUALITIES,
  HARMONIC_MINOR_TRIAD_QUALITIES,
  MELODIC_MINOR_SEVENTH_QUALITIES,
  MELODIC_MINOR_TRIAD_QUALITIES,
  NATURAL_MINOR_SEVENTH_QUALITIES,
  NATURAL_MINOR_TRIAD_QUALITIES,
  type SeventhQuality,
  type TriadQuality,
} from "./chords";
import { CIRCLE_OF_FIFTHS, type MusicalKey } from "./circle-of-fifths";
import type { KeySignature } from "./key-signature";
import {
  HARMONIC_MINOR_MODE_NAMES,
  MAJOR_MODE_NAMES,
  MELODIC_MINOR_MODE_NAMES,
  scaleModes,
  type Mode,
} from "./modes";
import { MAJOR_DEGREE_NAMES, MINOR_DEGREE_NAMES, RELATIVE_MINOR_DEGREE, sharpen } from "./scales";

export interface Alteration {
  degree: number;
  from: string;
  to: string;
}

export interface MinorScale extends MusicalKey {
  name: string;
  modes: Mode[];
  alterations: Alteration[];
}

export interface MinorKey {
  tonic: string;
  relativeMajor: string;
  signature: KeySignature;
  natural: MinorScale;
  harmonic: MinorScale;
  melodic: MinorScale;
}

interface MinorVariant {
  name: string;
  raisedDegrees: number[];
  degreeNames: string[];
  modeNames: string[];
  triadQualities: TriadQuality[];
  seventhQualities: SeventhQuality[];
}

const NATURAL: MinorVariant = {
  name: "natural minor",
  raisedDegrees: [],
  degreeNames: MINOR_DEGREE_NAMES,
  modeNames: rotate(MAJOR_MODE_NAMES, RELATIVE_MINOR_DEGREE),
  triadQualities: NATURAL_MINOR_TRIAD_QUALITIES,
  seventhQualities: NATURAL_MINOR_SEVENTH_QUALITIES,
};

const HARMONIC: MinorVariant = {
  name: "harmonic minor",
  raisedDegrees: [7],
  degreeNames: MAJOR_DEGREE_NAMES,
  modeNames: HARMONIC_MINOR_MODE_NAMES,
  triadQualities: HARMONIC_MINOR_TRIAD_QUALITIES,
  seventhQualities: HARMONIC_MINOR_SEVENTH_QUALITIES,
};

const MELODIC: MinorVariant = {
  name: "melodic minor",
  raisedDegrees: [6, 7],
  degreeNames: MAJOR_DEGREE_NAMES,
  modeNames: MELODIC_MINOR_MODE_NAMES,
  triadQualities: MELODIC_MINOR_TRIAD_QUALITIES,
  seventhQualities: MELODIC_MINOR_SEVENTH_QUALITIES,
};

function minorScale(natural: string[], variant: MinorVariant): MinorScale {
  const scale = natural.map((note, index) => (variant.raisedDegrees.includes(index + 1) ? sharpen(note) : note));
  const alterations = variant.raisedDegrees.map((degree) => ({
    degree,
    from: natural[degree - 1],
    to: scale[degree - 1],
  }));

  return {
    name: `${scale[0]} ${variant.name}`,
    tonic: scale[0],
    scale,
    degreeNames: variant.degreeNames,
    triads: diatonicTriads(scale, variant.triadQualities),
    sevenths: diatonicSevenths(scale, variant.seventhQualities),
    modes: scaleModes(scale, variant.modeNames, variant.triadQualities),
    alterations,
  };
}

// Ascending melodic minor; descending it matches the natural minor.
export const MINOR_KEYS: MinorKey[] = CIRCLE_OF_FIFTHS.flat().map(({ signature, major, minor }) => ({
  tonic: minor.tonic,
  relativeMajor: major.tonic,
  signature,
  natural: minorScale(minor.scale, NATURAL),
  harmonic: minorScale(minor.scale, HARMONIC),
  melodic: minorScale(minor.scale, MELODIC),
}));
