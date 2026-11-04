export function mod(value: number, size: number): number {
  return ((value % size) + size) % size;
}

export function shortestStep(from: number, to: number, size: number): number {
  const step = mod(to - from, size);
  return step > size / 2 ? step - size : step;
}

export function rotate<T>(items: readonly T[], by: number): T[] {
  const offset = mod(by, items.length);
  return [...items.slice(offset), ...items.slice(0, offset)];
}
