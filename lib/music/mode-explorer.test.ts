import { MODE_FAMILIES, type ModeInKey } from "./mode-explorer";

const mode = (name: string) => MODE_FAMILIES.flatMap(({ modes }) => modes).find((option) => option.name === name)!;

const modeIn = (name: string, tonic: string): ModeInKey => mode(name).keys.find((key) => key.tonic === tonic)!;

describe("MODE_FAMILIES", () => {
  it("groups the seven modes of the major, harmonic minor and melodic minor", () => {
    expect(MODE_FAMILIES.map(({ name, modes }) => `${name}: ${modes.length}`)).toEqual([
      "Major: 7",
      "Harmonic minor: 7",
      "Melodic minor: 7",
    ]);
  });

  it("offers each mode on every tonic the standard keys can spell, in circle order", () => {
    expect(mode("Dorian").keys.map(({ tonic }) => tonic)).toEqual([
      "D", "A", "E", "B", "F♯", "C♯", "D♭", "G♯", "A♭", "E♭", "D♯", "B♭", "F", "C", "G",
    ]);
  });

  it.each([
    ["Dorian", "C♯", "B major", 2],
    ["Phrygian dominant", "E", "A harmonic minor", 5],
    ["Lydian dominant", "F♯", "C♯ melodic minor", 4],
  ])("finds %s on %s in %s as mode %i", (name, tonic, parent, degree) => {
    const key = modeIn(name, tonic);
    expect(key.parent).toBe(parent);
    expect(key.degree).toBe(degree);
  });

  it("builds the chords from the mode's own tonic", () => {
    const summary = modeIn("Dorian", "D").triads.map(({ numeral, name }) => `${numeral}:${name}`).join(" ");
    expect(summary).toBe("i:Dm ii:Em III:F IV:G v:Am vi°:B° VII:C");
  });

  it("describes each degree against the major scale", () => {
    const key = modeIn("Mixolydian", "G");
    expect(key.scale.join(" ")).toBe("G A B C D E F");
    expect(key.degrees.map(({ label }) => label).join(" ")).toBe("1 2 3 4 5 6 ♭7");
    expect(key.degreeNames[6]).toBe("Minor 7th");
  });
});
