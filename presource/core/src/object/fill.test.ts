import { describe, test, expect } from '@jest/globals';
import { objectFill } from './fill';

describe('Testing objectFill functionality', () => {
  test('Filling in an object', () => {
    // Let's create a sample for testing
    const sample = { a: 1, b: 2, c: 3, d: 4, e: {}, f: [] };
    // Cannot fill object that key already exists!
    expect(objectFill(sample, { a: 'changed' })).toStrictEqual({ a: 1, b: 2, c: 3, d: 4, e: {}, f: [] });

    // Can Fill if key doesn't exists!
    expect(objectFill(sample, { h: 'changed' })).toStrictEqual({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: {},
      f: [],
      h: 'changed',
    });
  });
});
