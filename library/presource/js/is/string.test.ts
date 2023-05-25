import { describe, test, expect } from '@jest/globals';
import { isString } from './string';

describe('Basic isString Test', () => {
  test('Primitive is a string or not', () => {
    expect(isString('')).toBeTruthy();
    expect(isString('this is a string')).toBeTruthy();

    // All These should return false.
    expect(isString(1)).toBeFalsy();
    expect(isString([])).toBeFalsy();
    expect(isString({})).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
    expect(isString(false)).toBeFalsy();
    expect(isString(true)).toBeFalsy();
    expect(isString(() => {})).toBeFalsy();
  });
});
