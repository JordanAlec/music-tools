import { majorModes } from "./modes";

const D_MAJOR = ["D", "E", "F♯", "G", "A", "B", "C♯"];

describe("majorModes", () => {
  const modes = majorModes(D_MAJOR);

  it("starts each mode on the next degree of the parent scale", () => {
    expect(modes.map(({ tonic, name }) => `${tonic} ${name}`)).toEqual([
      "D Ionian",
      "E Dorian",
      "F♯ Phrygian",
      "G Lydian",
      "A Mixolydian",
      "B Aeolian",
      "C♯ Locrian",
    ]);
  });

  it("keeps the parent key's notes", () => {
    expect(modes[1].notes.join(" ")).toBe("E F♯ G A B C♯ D");
  });

  it("matches each mode's quality to the triad on its tonic", () => {
    expect(modes.map(({ quality }) => quality)).toEqual([
      "major",
      "minor",
      "minor",
      "major",
      "major",
      "minor",
      "diminished",
    ]);
  });
});
