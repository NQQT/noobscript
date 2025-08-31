import { describe, test, expect } from '@jest/globals';
import { objectExtract } from './extract';

describe('Object value extraction', () => {
  // Creating an example to test
  const example = {
    fruits: { apple: { color: 'red', quality: 1 }, banana: { color: 'yellow', quality: 1 } },
    animals: { cat: { color: 'brown', quality: 2 }, dog: { color: 'black', quality: 2 } },
  };

  test('Accessing by simple path string', () => {
    expect(objectExtract(example, 'fruits.apple')).toStrictEqual({ color: 'red', quality: 1 });
    expect(objectExtract(example, 'fruits.apple.color')).toStrictEqual('red');
    expect(objectExtract(example, 'fruits.apple.color.red')).toBeUndefined();
  });

  test('Getting multiple results using array', () => {
    expect(objectExtract(example, ['fruits.apple.color', 'animals.cat.color'])).toStrictEqual(['red', 'brown']);
  });
});
