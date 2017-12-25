import {
  addSubMultDivAsyncPromise
} from '../src/async-promise'


test("add sub mult div adds then subtracts then multiplies then divides", () => {
  const promise = addSubMultDivAsyncPromise(1, 3);
  expect(promise).resolves.toBeLessThanOrEqual(9);
  expect(promise).resolves.toBeGreaterThanOrEqual(-3);
});