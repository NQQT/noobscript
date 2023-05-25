import { describe, test, expect } from '@jest/globals';
import { objectShuffle } from './shuffle';

describe('Testing array shuffling', () => {
  test('Array has been shuffled', () => {
    // The Original object
    const original = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 };
    const shuffled = objectShuffle(original);
    // The Order should not be the same any more
    expect(JSON.stringify(shuffled)).not.toEqual(JSON.stringify(original));
  });
});
