import { describe, test, expect } from '@jest/globals';
import { isObject } from './object';

describe('isObject Check', () => {
  test('Checking basic variables as object', () => {
    expect(isObject(null)).toBeFalsy();
    expect(isObject(true)).toBeFalsy();
    expect(isObject(false)).toBeFalsy();
    expect(isObject('object')).toBeFalsy();
    expect(isObject(1)).toBeFalsy();
    expect(isObject(() => {})).toBeFalsy();
    expect(isObject([])).toBeFalsy();
    expect(isObject({})).toBeTruthy();
    expect(isObject({ a: 1, b: 2 })).toBeTruthy();
  });
});
