import { describe, test, expect } from '@jest/globals';
import { isBoolean } from './boolean';

describe('Checking value is a Boolean Type', () => {
  test('boolean values should return true', () => {
    expect(isBoolean(false)).toEqual(true);
    expect(isBoolean(true)).toEqual(true);
  });

  test('Non-boolean values should return false', () => {
    expect(isBoolean('')).toEqual(false);
    expect(isBoolean('string')).toEqual(false);
    expect(isBoolean([])).toEqual(false);
    expect(isBoolean([1, 2, 3, 4])).toEqual(false);
    expect(isBoolean(() => {})).toEqual(false);
    expect(isBoolean(1)).toEqual(false);
    expect(isBoolean(2)).toEqual(false);
    expect(isBoolean({})).toEqual(false);
    expect(isBoolean({ value: 1 })).toEqual(false);
    expect(isBoolean(undefined)).toEqual(false);
    expect(isBoolean(null)).toEqual(false);
  });
});
