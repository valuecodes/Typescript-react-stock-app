
const { calculatePE } = require('../src/utils/calculations')

it('Test price to earnings', () => {
  expect(
    calculatePE(100,10)
  ).toBe(10)
});