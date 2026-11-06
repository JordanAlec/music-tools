import { MINOR_KEYS, type MinorKey } from "./minor-keys";

const key = (tonic: string): MinorKey => MINOR_KEYS.find((minorKey) => minorKey.tonic === tonic)!;

const modeNames = (tonic: string, scale: "natural" | "harmonic" | "melodic") =>
  key(tonic)[scale].modes.map(({ tonic: modeTonic, name }) => `${modeTonic} ${name}`);

describe("MINOR_KEYS", () => {
  it("lists every minor key around the circle, enharmonic spellings included", () => {
    expect(MINOR_KEYS.map(({ tonic }) => tonic)).toEqual([
      "A", "E", "B", "F♯", "C♯", "G♯", "A♭", "D♯", "E♭", "B♭", "A♯", "F", "C", "G", "D",
    ]);
  });

  it.each([
    ["A", "C"],
    ["A♭", "C♭"],
    ["A♯", "C♯"],
  ])("pairs %s minor with its relative major, %s", (tonic, relativeMajor) => {
    expect(key(tonic).relativeMajor).toBe(relativeMajor);
  });

  it.each([
    ["A", "A B C D E F G", "A B C D E F G♯", "A B C D E F♯ G♯"],
    ["D", "D E F G A B♭ C", "D E F G A B♭ C♯", "D E F G A B C♯"],
    ["A♭", "A♭ B♭ C♭ D♭ E♭ F♭ G♭", "A♭ B♭ C♭ D♭ E♭ F♭ G", "A♭ B♭ C♭ D♭ E♭ F G"],
    ["A♯", "A♯ B♯ C♯ D♯ E♯ F♯ G♯", "A♯ B♯ C♯ D♯ E♯ F♯ G𝄪", "A♯ B♯ C♯ D♯ E♯ F𝄪 G𝄪"],
  ])("spells %s natural, harmonic and melodic minor", (tonic, natural, harmonic, melodic) => {
    const minorKey = key(tonic);
    expect(minorKey.natural.scale.join(" ")).toBe(natural);
    expect(minorKey.harmonic.scale.join(" ")).toBe(harmonic);
    expect(minorKey.melodic.scale.join(" ")).toBe(melodic);
  });

  it("records how each scale differs from the natural minor", () => {
    const eFlat = key("E♭");
    expect(eFlat.natural.alterations).toEqual([]);
    expect(eFlat.harmonic.alterations).toEqual([{ degree: 7, from: "D♭", to: "D" }]);
    expect(eFlat.melodic.alterations).toEqual([
      { degree: 6, from: "C♭", to: "C" },
      { degree: 7, from: "D♭", to: "D" },
    ]);
  });

  it("builds the chords from each scale's own notes", () => {
    const { harmonic } = key("E");
    expect(harmonic.triads[4].name).toBe("B");
    expect(harmonic.sevenths[6].notes).toEqual(["D♯", "F♯", "A", "C"]);
  });

  it("gives the natural minor the relative major's modes, starting from Aeolian", () => {
    expect(modeNames("A", "natural")).toEqual([
      "A Aeolian", "B Locrian", "C Ionian", "D Dorian", "E Phrygian", "F Lydian", "G Mixolydian",
    ]);
  });

  it.each([
    ["harmonic" as const, "E Phrygian dominant", "G♯ Super Locrian 𝄫7"],
    ["melodic" as const, "E Mixolydian ♭6", "G♯ Super Locrian"],
  ])("names the modes of the %s minor", (scale, fifthMode, seventhMode) => {
    const names = modeNames("A", scale);
    expect(names[4]).toBe(fifthMode);
    expect(names[6]).toBe(seventhMode);
  });

  it("calls the raised seventh the leading tone", () => {
    const { natural, harmonic } = key("A");
    expect(natural.degreeNames[6]).toBe("Subtonic");
    expect(harmonic.degreeNames[6]).toBe("Leading tone");
  });
});
