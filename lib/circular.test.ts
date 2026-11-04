import { mod, rotate, shortestStep } from "./circular";

describe("mod", () => {
  it.each([
    [13, 12, 1],
    [-1, 12, 11],
    [-13, 12, 11],
  ])("wraps %i into a circle of %i as %i", (value, size, expected) => {
    expect(mod(value, size)).toBe(expected);
  });
});

describe("shortestStep", () => {
  it.each([
    [0, 1, 1],
    [3, 5, 2],
    [11, 0, 1],
    [0, 11, -1],
    [2, 9, -5],
    [9, 2, 5],
    [0, 6, 6],
  ])("goes from %i to %i in %i steps", (from, to, expected) => {
    expect(shortestStep(from, to, 12)).toBe(expected);
  });
});

describe("rotate", () => {
  it.each([
    [2, ["c", "d", "a", "b"]],
    [-1, ["d", "a", "b", "c"]],
    [4, ["a", "b", "c", "d"]],
  ])("rotates by %i", (by, expected) => {
    expect(rotate(["a", "b", "c", "d"], by)).toEqual(expected);
  });

  it("leaves the original untouched", () => {
    const items = ["a", "b", "c"];
    rotate(items, 1);
    expect(items).toEqual(["a", "b", "c"]);
  });
});
