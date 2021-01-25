const { calculateDivYield } = require('./calculations')

it('Test Dividend Yield', () => {
  expect(
    calculateDivYield(100,10)
  ).toBe(10)
  expect(
    calculateDivYield(13.4,0.23)
  ).toBe(1.7)
});