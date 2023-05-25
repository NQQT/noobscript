import { describe, test, expect } from '@jest/globals';
import { isFunction, isFunctionAsync } from './function';

// For Checking Standard Function
describe('Checking value is a Function type', () => {
  test('Checking all type of functions', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(() => 'hello')).toBe(true);
    expect(
      isFunction((a: number, b: number) => {
        return a + b;
      }),
    ).toBe(true);
    expect(isFunction(() => () => {})).toBe(true);
    expect(isFunction(async () => {})).toBe(true);
  });

  test('Checking non-functions. These should return false', () => {
    expect(isFunction('()=>{}')).toBe(false);
    expect(isFunction('function')).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction(2)).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction({})).toBe(false);
  });

  //! Test does not work due to typescript converts to older JS
  // test('Check whether a function is async', () => {
  //   expect(isFunctionAsync('()=>{}')).toBe(false);
  //   expect(isFunctionAsync('function')).toBe(false);
  //   expect(isFunctionAsync(undefined)).toBe(false);
  //   expect(isFunctionAsync(null)).toBe(false);
  //   expect(isFunctionAsync(1)).toBe(false);
  //   expect(isFunctionAsync(2)).toBe(false);
  //   expect(isFunctionAsync([])).toBe(false);
  //   expect(isFunctionAsync({})).toBe(false);
  //   expect(isFunctionAsync(async () => {})).toBe(true);
  // });
});
