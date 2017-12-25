import {
  addSubMultDivAsyncCallback
} from '../src/async-callback'

test("add sub mult div adds then subtracts then multiplies then divides", () => {
  // (1 + 3 - 1) * 3 / 1
  addSubMultDivAsyncCallback(1, 3, (e, r) => {
    expect(r).toBeLessThanOrEqual(9);
    expect(r).toBeGreaterThanOrEqual(-3);
    done();
  });
});