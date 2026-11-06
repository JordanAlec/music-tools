import { rotate } from "../circular";
import {
  diatonicSevenths,
  diatonicTriads,
  HARMONIC_MINOR_SEVENTH_QUALITIES,
  HARMONIC_MINOR_TRIAD_QUALITIES,
  MAJOR_SEVENTH_QUALITIES,
  MAJOR_TRIAD_QUALITIES,
  MELODIC_MINOR_SEVENTH_QUALITIES,
  MELODIC_MINOR_TRIAD_QUALITIES,
  type SeventhQuality,
  type TriadQuality,
} from "./chords";
import { CIRCLE_OF_FIFTHS, type MusicalKey } from "./circle-of-fifths";
import { scaleDegrees, type ScaleDegree } from "./intervals";
import { MINOR_KEYS } from "./minor-keys";
import { HARMONIC_MINOR_MODE_NAMES, MAJOR_MODE_NAMES, MELODIC_MINOR_MODE_NAMES } from "./modes";

export interface ModeInKey extends MusicalKey {
  name: string;
  parent: string;
  degree: number;
  degrees: ScaleDegree[];
}

export interface ModeOption {
  name: string;
  keys: ModeInKey[];
}

export interface ModeFamily {
  name: string;
  modes: ModeOption[];
}

interface ParentScale {
  name: string;
  scale: string[];
}

interface FamilyDefinition {
  name: string;
  modeNames: string[];
  triadQualities: TriadQuality[];
  seventhQualities: SeventhQuality[];
  parents: ParentScale[];
}

const FAMILIES: FamilyDefinition[] = [
  {
    name: "Major",
    modeNames: MAJOR_MODE_NAMES,
    triadQualities: MAJOR_TRIAD_QUALITIES,
    seventhQualities: MAJOR_SEVENTH_QUALITIES,
    parents: CIRCLE_OF_FIFTHS.flat().map(({ major }) => ({ name: `${major.tonic} major`, scale: major.scale })),
  },
  {
    name: "Harmonic minor",
    modeNames: HARMONIC_MINOR_MODE_NAMES,
    triadQualities: HARMONIC_MINOR_TRIAD_QUALITIES,
    seventhQualities: HARMONIC_MINOR_SEVENTH_QUALITIES,
    parents: MINOR_KEYS.map(({ harmonic }) => harmonic),
  },
  {
    name: "Melodic minor",
    modeNames: MELODIC_MINOR_MODE_NAMES,
    triadQualities: MELODIC_MINOR_TRIAD_QUALITIES,
    seventhQualities: MELODIC_MINOR_SEVENTH_QUALITIES,
    parents: MINOR_KEYS.map(({ melodic }) => melodic),
  },
];

function modeInKey(family: FamilyDefinition, parent: ParentScale, index: number): ModeInKey {
  const scale = rotate(parent.scale, index);
  const degrees = scaleDegrees(scale);

  return {
    name: `${scale[0]} ${family.modeNames[index]}`,
    parent: parent.name,
    degree: index + 1,
    tonic: scale[0],
    scale,
    degrees,
    degreeNames: degrees.map(({ name }) => name),
    triads: diatonicTriads(scale, rotate(family.triadQualities, index)),
    sevenths: diatonicSevenths(scale, rotate(family.seventhQualities, index)),
  };
}

// Only tonics the 15 standard keys can spell are offered, e.g. F♯ Lydian dominant but not G♭.
export const MODE_FAMILIES: ModeFamily[] = FAMILIES.map((family) => ({
  name: family.name,
  modes: family.modeNames.map((name, index) => ({
    name,
    keys: family.parents.map((parent) => modeInKey(family, parent, index)),
  })),
}));
