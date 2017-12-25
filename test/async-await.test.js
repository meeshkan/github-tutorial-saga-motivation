import {
  addSubMultDivAsyncAwait
} from '../src/async-await'

test("add sub mult div adds then subtracts then multiplies then divides", async () => {
  const data0 = await addSubMultDivAsyncAwait(1, 3);
  expect(data0).toBeLessThanOrEqual(9);
  expect(data0).toBeGreaterThanOrEqual(-3);
});