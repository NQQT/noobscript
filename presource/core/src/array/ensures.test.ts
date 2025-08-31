import { describe, test, expect } from '@jest/globals';
import { arrayEnsures } from './ensures';

describe('Array Ensures: Ensuring a variable is an array', () => {
  test('All output should be an array', () => {
    // If No thing passed, return array
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
