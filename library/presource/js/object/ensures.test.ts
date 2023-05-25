import { describe, test, expect } from '@jest/globals';
import { objectEnsures } from './ensures';

describe('Array Ensures: Ensuring a variable is an array', () => {
  test('All output should be an array', () => {
    expect(objectEnsures()).toStrictEqual({});
    expect(objectEnsures(1)).toStrictEqual({ 1: 1 });
    expect(objectEnsures('a')).toStrictEqual({ a: 'a' });
    expect(objectEnsures(null)).toStrictEqual({ null: null });
    // Same as if nothing is passed
    expect(objectEnsures(undefined)).toStrictEqual({});
    expect(objectEnsures([1, 2, 3])).toStrictEqual({ 0: 1, 1: 2, 2: 3 });
    expect(objectEnsures({ is: 'object' })).toStrictEqual({ is: 'object' });

    // Special Cases Function
    expect(objectEnsures(() => 'a')).toStrictEqual({ a: 'a' });
    expect(
      objectEnsures(() => ({
        is: 'nested',
      })),
    ).toStrictEqual({ is: 'nested' });
  });
});
