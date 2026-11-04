import { keySignature } from "./key-signature";
import { majorScale } from "./scales";

describe("majorScale", () => {
  it.each([
    ["C", 0, "C D E F G A B"],
    ["G", 1, "G A B C D E F♯"],
    ["F", -1, "F G A B♭ C D E"],
    ["F♯", 6, "F♯ G♯ A♯ B C♯ D♯ E♯"],
    ["G♭", -6, "G♭ A♭ B♭ C♭ D♭ E♭ F"],
    ["C♯", 7, "C♯ D♯ E♯ F♯ G♯ A♯ B♯"],
    ["C♭", -7, "C♭ D♭ E♭ F♭ G♭ A♭ B♭"],
  ])("spells %s major (%i fifths) as %s", (tonic, fifths, expected) => {
    expect(majorScale(tonic, keySignature(fifths)).join(" ")).toBe(expected);
  });
});
