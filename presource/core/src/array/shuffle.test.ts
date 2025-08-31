import { describe, expect, test } from '@jest/globals';
import { arrayShuffle } from '@presource/core';

describe('Testing array shuffling', () => {
  test('Array has been shuffled', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffled = arrayShuffle(original);
    // The Order should not be the same any more
    expect(shuffled).not.toStrictEqual(original);
  });
});
