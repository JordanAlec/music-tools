import { scaleDegrees, stepPattern } from "./intervals";

const formula = (scale: string[]) => scaleDegrees(scale).map(({ label }) => label).join(" ");

describe("scaleDegrees", () => {
  it.each([
    ["D Dorian", ["D", "E", "F", "G", "A", "B", "C"], "1 2 ♭3 4 5 6 ♭7"],
    ["B Locrian", ["B", "C", "D", "E", "F", "G", "A"], "1 ♭2 ♭3 4 ♭5 ♭6 ♭7"],
    ["C Lydian augmented", ["C", "D", "E", "F♯", "G♯", "A", "B"], "1 2 3 ♯4 ♯5 6 7"],
    ["A♯ harmonic minor", ["A♯", "B♯", "C♯", "D♯", "E♯", "F♯", "G𝄪"], "1 2 ♭3 4 5 ♭6 7"],
    ["G Super Locrian 𝄫7", ["G", "A♭", "B♭", "C♭", "D♭", "E♭", "F♭"], "1 ♭2 ♭3 ♭4 ♭5 ♭6 𝄫7"],
  ])("gives the formula of %s against the major scale", (_, scale, expected) => {
    expect(formula(scale)).toBe(expected);
  });

  it("names each degree by its interval from the root", () => {
    expect(scaleDegrees(["G", "A♭", "B♭", "C♭", "D♭", "E♭", "F♭"]).map(({ name }) => name)).toEqual([
      "Root",
      "Minor 2nd",
      "Minor 3rd",
      "Diminished 4th",
      "Diminished 5th",
      "Minor 6th",
      "Diminished 7th",
    ]);
  });

  it("marks only the degrees that differ from the major scale", () => {
    const altered = scaleDegrees(["F", "G", "A", "B", "C", "D", "E"]).map(({ isAltered }) => isAltered);
    expect(altered).toEqual([false, false, false, true, false, false, false]);
  });
});

describe("stepPattern", () => {
  it.each([
    ["C major", ["C", "D", "E", "F", "G", "A", "B"], "W W H W W W H"],
    ["D Dorian", ["D", "E", "F", "G", "A", "B", "C"], "W H W W W H W"],
    ["A harmonic minor", ["A", "B", "C", "D", "E", "F", "G♯"], "W H W W H W+H H"],
    ["A♯ harmonic minor", ["A♯", "B♯", "C♯", "D♯", "E♯", "F♯", "G𝄪"], "W H W W H W+H H"],
  ])("gives the steps of %s up to the octave", (_, scale, expected) => {
    expect(stepPattern(scale).join(" ")).toBe(expected);
  });
});
