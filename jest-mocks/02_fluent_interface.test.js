const Kitten = require('../SUT/classes/kitten')

test('With a fluent interface we can chain methods together', () => {
  const kitten = new Kitten()
    .setName('Salem')
    .setColor('black')
    .save();

  expect(kitten.name).toBe('Salem')
  expect(kitten.color).toBe('black')
})
