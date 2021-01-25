const { calculateDivYield } = require('../src/utils/calculations')

it('Test price to earnings', () => {
  expect(
    calculateDivYield(100,10)
  ).toBe(0.1)
});