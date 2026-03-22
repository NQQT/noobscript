import { describe, expect, test } from '@jest/globals';
import { arrayEnsures } from '@presource/core';

describe('Array Ensures: Ensuring a variable is an array', () => {
  test('all output from the method will returns an array', () => {
    // If nothing is passed, return array
    expect(arrayEnsures()).toStrictEqual([]);

    // Same as if nothing is passed in the beginning.
    expect(arrayEnsures(undefined)).toStrictEqual([]);

    expect(arrayEnsures(1)).toStrictEqual([1]);
    expect(arrayEnsures('a')).toStrictEqual(['a']);
    expect(arrayEnsures(null)).toStrictEqual([null]);
    expect(arrayEnsures([1, 2, 3])).toStrictEqual([1, 2, 3]);
    expect(arrayEnsures({ is: 'object' })).toStrictEqual([{ is: 'object' }]);

    // Special Cases Function
    expect(arrayEnsures(() => 'a')).toStrictEqual(['a']);
  });
});
