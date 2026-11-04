import { CIRCLE_OF_FIFTHS, wheelLabels } from "./circle-of-fifths";

const tonicsAt = (position: number) => CIRCLE_OF_FIFTHS[position].map(({ major }) => major.tonic);

const around = (labels: string[], position: number) =>
  [position - 1, position, position + 1].map((index) => labels[(index + labels.length) % labels.length]);

describe("CIRCLE_OF_FIFTHS", () => {
  it("orders the conventional keys clockwise by fifths", () => {
    expect(CIRCLE_OF_FIFTHS.map(([conventional]) => conventional.major.tonic)).toEqual([
      "C", "G", "D", "A", "E", "B", "F♯", "D♭", "A♭", "E♭", "B♭", "F",
    ]);
  });

  it.each([
    [5, ["B", "C♭"]],
    [6, ["F♯", "G♭"]],
    [7, ["D♭", "C♯"]],
  ])("lists the enharmonic spellings at position %i with the fewest accidentals first", (position, tonics) => {
    expect(tonicsAt(position)).toEqual(tonics);
  });

  it("only has enharmonic spellings at the bottom of the circle", () => {
    const withEnharmonics = CIRCLE_OF_FIFTHS.flatMap((spellings, position) => (spellings.length > 1 ? [position] : []));
    expect(withEnharmonics).toEqual([5, 6, 7]);
  });

  it.each([
    ["C", "A", "B°"],
    ["E♭", "C", "D°"],
    ["F♯", "D♯", "E♯°"],
    ["G♭", "E♭", "F°"],
    ["C♭", "A♭", "B♭°"],
  ])("pairs %s major with %s minor and %s", (major, minor, diminished) => {
    const key = CIRCLE_OF_FIFTHS.flat().find((spelling) => spelling.major.tonic === major)!;
    expect(key.minor.tonic).toBe(minor);
    expect(key.diminished.name).toBe(diminished);
  });

  it("gives the relative minor the same notes as its major", () => {
    const [eFlat] = CIRCLE_OF_FIFTHS[9];
    expect([...eFlat.minor.scale].sort()).toEqual([...eFlat.major.scale].sort());
    expect(eFlat.minor.scale.join(" ")).toBe("C D E♭ F G A♭ B♭");
  });
});

describe("wheelLabels", () => {
  it.each([
    [0, 0, ["F", "C", "G"], ["Dm", "Am", "Em"], "B°"],
    [5, 0, ["E", "B", "F♯"], ["C♯m", "G♯m", "D♯m"], "A♯°"],
    [5, 1, ["F♭", "C♭", "G♭"], ["D♭m", "A♭m", "E♭m"], "B♭°"],
    [6, 1, ["C♭", "G♭", "D♭"], ["A♭m", "E♭m", "B♭m"], "F°"],
    [7, 0, ["G♭", "D♭", "A♭"], ["E♭m", "B♭m", "Fm"], "C°"],
    [6, 0, ["B", "F♯", "C♯"], ["G♯m", "D♯m", "A♯m"], "E♯°"],
    [7, 1, ["F♯", "C♯", "G♯"], ["D♯m", "A♯m", "E♯m"], "B♯°"],
  ])(
    "at position %i, spelling %i, spells the neighbours as the selected key's chords",
    (position, spelling, majors, minors, diminished) => {
      const labels = wheelLabels(position, CIRCLE_OF_FIFTHS[position][spelling]);
      expect(around(labels.major, position)).toEqual(majors);
      expect(around(labels.minor, position)).toEqual(minors);
      expect(labels.diminished[position]).toBe(diminished);
    },
  );

  it("keeps the conventional spelling away from the selected key", () => {
    const cFlat = CIRCLE_OF_FIFTHS[5][1];
    const labels = wheelLabels(5, cFlat);
    expect(labels.major[0]).toBe("C");
    expect(labels.major[7]).toBe("D♭");
    expect(labels.minor[11]).toBe("Dm");
    expect(labels.diminished[6]).toBe("E♯°");
  });
});
