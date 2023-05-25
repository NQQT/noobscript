import { describe, expect, test } from '@jest/globals';
import { booleanTrue } from './true';

describe('Testing booleanTrue function', () => {
  test('Basic Usage', () => {
    // Expect Everything to Return True
    expect(
      booleanTrue({
        a: 1,
        b: {}, // Object is Special. Since it is an empty object, it should consider to be true
        c: [],
        d: () => 1,
      }),
    ).toBeTruthy();

    expect(
      booleanTrue({
        a: 1,
        b: 2,
        c: 0, // This will return false, making the whole argument false.
        d: 4,
      }),
    ).toBeFalsy();
  });

  test('Advance Usage', () => {
    // Nested Expression via Object
    // True Test
    expect(
      booleanTrue({
        simple: 1,
        function: () => 2,
        nested: {
          a: 1,
          b: 2,
          c: 3,
        },
      }),
    ).toBeTruthy();

    // False Test
    expect(
      booleanTrue({
        simple: 1,
        function: () => 2,
        nested: {
          a: 1,
          b: undefined, // This should trigger everything to be false!
          c: false, // This should trigger everything to be false!
        },
      }),
    ).toBeFalsy();
  });
});
