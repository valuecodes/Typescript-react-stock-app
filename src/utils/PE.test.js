const { calculatePE } = require('./calculations')

it('Test Price to earnings', () => {
  expect(
    calculatePE(100,10)
  ).toBe(10)
  expect(
    calculatePE(13.4,0.57)
  ).toBe(23.5)
});