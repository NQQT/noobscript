import { describe, expect, test } from '@jest/globals';
import { booleanPartialTrue, booleanPartialFalse } from './partial';

describe('Testing booleanPartialTrue functionality', () => {
  test('Basic Usage', () => {
    expect(
      booleanPartialTrue({
        a: 0, // Zero is consider as false.
        b: '', // Empty string is consider as false
        c: false, // false is false
        d: null, //  null should also be false
        e: undefined, // Same undefined
      }),
    ).toBeFalsy();

    expect(
      booleanPartialTrue({
        a: 0,
        b: 0,
        c: 1, // At least one to be truth, for the whole evaluation to be true!
        d: 0,
        e: 0,
      }),
    ).toBeTruthy();
  });

  test('Advance Usage', () => {
    expect(
      booleanPartialTrue({
        a: false,
        b: null,
        c: undefined,
        d: {}, // Empty object should be considered true
      }),
    ).toBeTruthy();

    expect(
      booleanPartialTrue({
        a: false,
        b: null,
        c: undefined,
        d: {
          1: undefined, // Children is undefined. Should be false
        },
      }),
    ).toBeFalsy();
  });
});

describe('booleanPartialFalse test', () => {
  test('Basic usage of booleanPartialFalse', () => {
    // Expect Return to be True
    expect(booleanPartialFalse({ a: 0, b: false, c: undefined, d: null })).toBeTruthy();
    expect(booleanPartialFalse({ a: 0, b: true, c: undefined, d: null })).toBeTruthy();
    expect(booleanPartialFalse({ a: 1, b: false, c: undefined, d: null })).toBeTruthy();
    expect(booleanPartialFalse({ a: {} })).toBeFalsy();
    expect(booleanPartialFalse({ a: { 1: true, 2: 1 } })).toBeFalsy();
    expect(booleanPartialFalse({ a: { 1: false, 2: 1 } })).toBeTruthy();
  });
});
