import {
  addSubMultDiv
} from '../src/sync'

test("add sub mult div adds then subtracts then multiplies then divides", () => {
  let i = 0;
  for (; i < 100; i++) {
    // (1 + 1 - 3) * 3 / 1
    expect(addSubMultDiv(1, 3)).toBeGreaterThanOrEqual(-3);
    // (1 + 3 - 1) * 3 / 1
    expect(addSubMultDiv(1, 3)).toBeLessThanOrEqual(9);
  }
});