import { describe, expect, test } from '@jest/globals';
import { isArray } from '@presource/core';

describe('isArray Check', () => {
  test('Checking basic variables as object', () => {
    expect(isArray(null)).toBeFalsy();
    expect(isArray(true)).toBeFalsy();
    expect(isArray(false)).toBeFalsy();
    expect(isArray('object')).toBeFalsy();
    expect(isArray([])).toBeTruthy();
    expect(isArray({})).toBeFalsy();
    expect(isArray([1, 2, 3, 4, 5])).toBeTruthy();
    expect(isArray(['a', 'b', 'c', 'd', 'e'])).toBeTruthy();
  });
});
