import { describe, test, expect } from '@jest/globals';
import { objectFlatten } from './flatten';

describe('Object flatten', () => {
  test('Basic object flattening', () => {
    // Setting an Example
    const example = { fruits: { apple: 1, banana: 2 }, animals: { cat: 1, dog: 2 } };

    // Checking Example Flattening
    expect(objectFlatten(example)).toStrictEqual({
      'fruits.apple': 1,
      'fruits.banana': 2,
      'animals.cat': 1,
      'animals.dog': 2,
    });
  });

  test('Empty key should not be added as trailing', () => {
    const example = { classes: { '': 'astrid', students: ['will', 'sandy', 'thomas'] } };

    // Checking the Flattened Result
    expect(objectFlatten(example)).toStrictEqual({
      classes: 'astrid',
      'classes.students': ['will', 'sandy', 'thomas'],
    });
  });

  test('Using keyValue callback', () => {
    const example = { classes: { '': 'astrid', students: ['will', 'sandy', 'thomas'] } };
    // Flattening by Stripping
    const result = objectFlatten(example, { key: ({ k, p }) => (k ? k : '') });

    // Expecting the Flattened Result to be the following
    expect(result).toStrictEqual({
      classes: 'astrid',
      students: ['will', 'sandy', 'thomas'],
    });
  });
});
