const { annualReturn } = require('./calculations')

it('Test Annual returns', () => {
  expect(
    annualReturn(10,20)
  ).toBe(7.2)
  expect(
    annualReturn(7,22)
  ).toBe(12.1)
});