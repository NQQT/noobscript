import { describe, test, expect } from '@jest/globals';
import { isEmpty, isEmptyArray, isEmptyObject } from './empty';

describe('isEmpty', () => {
  test('Testing isEmptyArray', () => {
    expect(isEmptyArray([])).toBeTruthy();
    expect(isEmptyArray([[]])).toBeTruthy();
    expect(isEmptyArray([[], [], []])).toBeTruthy();
    expect(isEmptyArray([{}])).toBeTruthy();
    expect(isEmptyArray([1])).toBeFalsy();
  });

  test('Testing isEmptyObject', () => {
    expect(isEmptyObject({})).toBeTruthy();
    expect(isEmptyObject({ a: 1, b: 2 })).toBeFalsy();
    expect(isEmptyObject({ a: null, b: undefined })).toBeFalsy();
    // Can also check nesting validations
    expect(isEmptyObject({ a: {} })).toBeTruthy();
    expect(isEmptyObject({ a: { b: { c: {} } } })).toBeTruthy();
    // By Default. Empty string is empty
    expect(isEmptyObject({ a: { b: { c: { d: '' } } } })).toBeTruthy();
  });

  // Major testing isEmpty
  test('isEmpty main function', () => {
    // These are basic format
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty(' ')).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty(NaN)).toBeTruthy();

    expect(isEmpty('a')).toBeFalsy();
    expect(isEmpty('1')).toBeFalsy();
  });
});
