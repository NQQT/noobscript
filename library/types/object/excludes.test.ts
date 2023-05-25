import { describe, test, expect } from '@jest/globals';
import { ObjectExcludes } from './excludes';

describe('Object Excludes Types', () => {
  test('Basic Exclusions', () => {
    const example = { number: 10, string: 'banana', array: [1, 2, 3], boolean: false };
    type Example = typeof example;

    type Excludes = ObjectExcludes<Example, number>;

    // Inclusive must contain number
    const excludes: Excludes = {
      string: 'hello',
      array: [],
      boolean: true,
    };

    expect(excludes).toStrictEqual({ number: 10 });
  });
});
