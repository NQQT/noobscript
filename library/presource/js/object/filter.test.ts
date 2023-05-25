import { describe, test, expect } from '@jest/globals';
import { objectFilter } from './filter';

describe('Usage of objectFilter', () => {
  // Sample object
  const sample = {
    a: 'apple',
    b: 'banana',
    c: 'cat',
    d: 'dog',
    e: undefined,
    f: null,
  };

  test('Can be used to filter out invalid values', () => {
    // Filtered out Invalid Values
    const filtered = objectFilter(sample, ({ value }) => value);
    // The Expected Result should be
    const expected = { a: 'apple', b: 'banana', c: 'cat', d: 'dog' };
    // Test
    expect(filtered).toStrictEqual(expected);
  });

  test('Can be used to selective', () => {
    // Only Return the First 4 values
    const filtered = objectFilter(sample, ({ index }) => index < 4);
    // The Expected Result should be
    const expected = { a: 'apple', b: 'banana', c: 'cat', d: 'dog' };
    // Test
    expect(filtered).toStrictEqual(expected);
  });
});
