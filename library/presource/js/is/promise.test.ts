import { describe, test, expect } from '@jest/globals';
import { isPromise } from './promise';

describe('isPromise', () => {
  test('Basic promise check', () => {
    // The value is not a promise
    expect(isPromise((() => ({}))())).toBeFalsy();
    // The return value is a promise
    expect(isPromise((async () => {})())).toBeTruthy();
  });
});
