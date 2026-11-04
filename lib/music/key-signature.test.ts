import { describeSignature, keySignature, signatureSymbol } from "./key-signature";

describe("keySignature", () => {
  it.each([
    [0, null, []],
    [1, "sharp", ["F♯"]],
    [3, "sharp", ["F♯", "C♯", "G♯"]],
    [7, "sharp", ["F♯", "C♯", "G♯", "D♯", "A♯", "E♯", "B♯"]],
    [-1, "flat", ["B♭"]],
    [-4, "flat", ["B♭", "E♭", "A♭", "D♭"]],
    [-7, "flat", ["B♭", "E♭", "A♭", "D♭", "G♭", "C♭", "F♭"]],
  ])("with %i fifths has %s accidentals %j in order", (fifths, accidental, notes) => {
    expect(keySignature(fifths)).toEqual({ accidental, notes });
  });
});

describe("describeSignature", () => {
  it.each([
    [0, "No sharps or flats"],
    [1, "1 sharp"],
    [2, "2 sharps"],
    [-1, "1 flat"],
    [-6, "6 flats"],
  ])("describes %i fifths as %s", (fifths, expected) => {
    expect(describeSignature(keySignature(fifths))).toBe(expected);
  });
});

describe("signatureSymbol", () => {
  it.each([
    [0, "0"],
    [2, "2♯"],
    [-6, "6♭"],
  ])("shows %i fifths as %s", (fifths, expected) => {
    expect(signatureSymbol(keySignature(fifths))).toBe(expected);
  });
});
