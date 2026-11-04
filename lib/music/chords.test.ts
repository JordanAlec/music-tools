import {
  diatonicSevenths,
  diatonicTriads,
  MAJOR_SEVENTH_QUALITIES,
  MAJOR_TRIAD_QUALITIES,
  NATURAL_MINOR_SEVENTH_QUALITIES,
  NATURAL_MINOR_TRIAD_QUALITIES,
  type Chord,
} from "./chords";

const C_MAJOR = ["C", "D", "E", "F", "G", "A", "B"];
const A_MINOR = ["A", "B", "C", "D", "E", "F", "G"];
const F_SHARP_MAJOR = ["F♯", "G♯", "A♯", "B", "C♯", "D♯", "E♯"];

const summarise = (chords: Chord[]) => chords.map(({ numeral, name }) => `${numeral}:${name}`).join(" ");

describe("diatonicTriads", () => {
  it("builds the triads of a major key", () => {
    expect(summarise(diatonicTriads(C_MAJOR, MAJOR_TRIAD_QUALITIES))).toBe(
      "I:C ii:Dm iii:Em IV:F V:G vi:Am vii°:B°",
    );
  });

  it("builds the triads of a natural minor key", () => {
    expect(summarise(diatonicTriads(A_MINOR, NATURAL_MINOR_TRIAD_QUALITIES))).toBe(
      "i:Am ii°:B° III:C iv:Dm v:Em VI:F VII:G",
    );
  });

  it("stacks thirds from the scale, wrapping past the seventh degree", () => {
    const triads = diatonicTriads(F_SHARP_MAJOR, MAJOR_TRIAD_QUALITIES);
    expect(triads[0].notes).toEqual(["F♯", "A♯", "C♯"]);
    expect(triads[6].notes).toEqual(["E♯", "G♯", "B"]);
  });
});

describe("diatonicSevenths", () => {
  it("builds the seventh chords of a major key", () => {
    expect(summarise(diatonicSevenths(C_MAJOR, MAJOR_SEVENTH_QUALITIES))).toBe(
      "Imaj7:Cmaj7 ii7:Dm7 iii7:Em7 IVmaj7:Fmaj7 V7:G7 vi7:Am7 viiø7:Bm7♭5",
    );
  });

  it("builds the seventh chords of a natural minor key", () => {
    expect(summarise(diatonicSevenths(A_MINOR, NATURAL_MINOR_SEVENTH_QUALITIES))).toBe(
      "i7:Am7 iiø7:Bm7♭5 IIImaj7:Cmaj7 iv7:Dm7 v7:Em7 VImaj7:Fmaj7 VII7:G7",
    );
  });

  it("adds the seventh above the triad", () => {
    const dominant = diatonicSevenths(C_MAJOR, MAJOR_SEVENTH_QUALITIES)[4];
    expect(dominant.notes).toEqual(["G", "B", "D", "F"]);
  });
});
