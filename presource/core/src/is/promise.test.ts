import { describe, expect, test } from '@jest/globals';
import { isPromise } from '@presource/core';

describe('isPromise', () => {
  test('Basic promise check', () => {
    // The value is not a promise
    expect(isPromise((() => ({}))())).toBeFalsy();
    // The return value is a promise
    expect(isPromise((async () => {})())).toBeTruthy();
  });
});
