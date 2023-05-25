import { describe, test, expect } from '@jest/globals';
import { isEqual } from './equal';

describe('Checking Equality', () => {
  test('primitive should be equal to each other', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('abc', 'abc')).toBe(true);
    expect(isEqual(10, 10)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
  });

  test('these primitives should not return true', () => {
    expect(isEqual(1, '1')).toBe(false);
    expect(isEqual(undefined, null)).toBe(false);
  });

  test('Complex objects and array', () => {
    // These expect to return false
    expect(isEqual([], [])).toBe(false);
    expect(isEqual({}, {})).toBe(false);
    expect(
      isEqual(
        () => {},
        () => {},
      ),
    ).toBe(false);

    // These expect to return true
    const array: any = [];
    const object = {};
    const callback = () => {};
    expect(isEqual(array, array)).toBe(true);
    expect(isEqual(object, object)).toBe(true);
    expect(isEqual(callback, callback)).toBe(true);
  });
});
