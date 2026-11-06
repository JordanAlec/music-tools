import {
  diatonicSevenths,
  diatonicTriads,
  HARMONIC_MINOR_SEVENTH_QUALITIES,
  HARMONIC_MINOR_TRIAD_QUALITIES,
  MAJOR_SEVENTH_QUALITIES,
  MAJOR_TRIAD_QUALITIES,
  MELODIC_MINOR_SEVENTH_QUALITIES,
  MELODIC_MINOR_TRIAD_QUALITIES,
  NATURAL_MINOR_SEVENTH_QUALITIES,
  NATURAL_MINOR_TRIAD_QUALITIES,
  type Chord,
} from "./chords";

const C_MAJOR = ["C", "D", "E", "F", "G", "A", "B"];
const A_MINOR = ["A", "B", "C", "D", "E", "F", "G"];
const A_HARMONIC_MINOR = ["A", "B", "C", "D", "E", "F", "G♯"];
const A_MELODIC_MINOR = ["A", "B", "C", "D", "E", "F♯", "G♯"];
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

  it("builds the triads of a harmonic minor key", () => {
    expect(summarise(diatonicTriads(A_HARMONIC_MINOR, HARMONIC_MINOR_TRIAD_QUALITIES))).toBe(
      "i:Am ii°:B° III+:C+ iv:Dm V:E VI:F vii°:G♯°",
    );
  });

  it("builds the triads of a melodic minor key", () => {
    expect(summarise(diatonicTriads(A_MELODIC_MINOR, MELODIC_MINOR_TRIAD_QUALITIES))).toBe(
      "i:Am ii:Bm III+:C+ IV:D V:E vi°:F♯° vii°:G♯°",
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

  it("builds the seventh chords of a harmonic minor key", () => {
    expect(summarise(diatonicSevenths(A_HARMONIC_MINOR, HARMONIC_MINOR_SEVENTH_QUALITIES))).toBe(
      "i(maj7):Am(maj7) iiø7:Bm7♭5 III+maj7:C+maj7 iv7:Dm7 V7:E7 VImaj7:Fmaj7 vii°7:G♯°7",
    );
  });

  it("builds the seventh chords of a melodic minor key", () => {
    expect(summarise(diatonicSevenths(A_MELODIC_MINOR, MELODIC_MINOR_SEVENTH_QUALITIES))).toBe(
      "i(maj7):Am(maj7) ii7:Bm7 III+maj7:C+maj7 IV7:D7 V7:E7 viø7:F♯m7♭5 viiø7:G♯m7♭5",
    );
  });

  it("adds the seventh above the triad", () => {
    const dominant = diatonicSevenths(C_MAJOR, MAJOR_SEVENTH_QUALITIES)[4];
    expect(dominant.notes).toEqual(["G", "B", "D", "F"]);
  });
});
