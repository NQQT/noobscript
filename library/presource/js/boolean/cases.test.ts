import { describe, expect, test } from '@jest/globals';
import { booleanCases } from './cases';

describe('Testing BooleanEach', () => {
  // Boolean each is different than arrayEach or objectEach, as booleanEach is not against an object.
  // Boolean each will be assessing against a series of cases
  test('Basic Boolean Cases Check', () => {
    const cases = {
      numberTrue: () => 1,
      numberFalse: () => 0,
    };

    // Empty Callback. Boolean will evaluate every cases and return
    expect(booleanCases(cases)).toStrictEqual({ numberTrue: true, numberFalse: false });

    // Prematurely Return
    expect(booleanCases(cases, () => true)).toBeTruthy();
    expect(booleanCases(cases, () => false)).toBeFalsy();

    // Selective Return
    expect(
      booleanCases(cases, ({ key }) => {
        // When Key is equal to numberFalse. Return true
        if (key === 'numberFalse') return true;
      }),
    ).toBeTruthy();
  });

  test('Nested Boolean Cases Check', () => {
    const cases = {
      nested: {},
    };

    expect(booleanCases(cases)).toStrictEqual({ nested: {} });
  });
});
