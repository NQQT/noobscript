import { describe, test, expect } from '@jest/globals';
import { stringCapitalize } from './capitalize';

describe('String Capitalisation', () => {
  test('it should capitalise first letter', () => {
    expect(stringCapitalize('capitalise')).toEqual('Capitalise');
  });

  test('it should capitalise second letter', () => {
    expect(stringCapitalize('apple', 1)).toEqual('aPple');
  });

  test('it should capitalise the last letter', () => {
    expect(stringCapitalize('banana', -1)).toEqual('bananA');
  });

  test('it should capitalise first letter of every word in a string', () => {
    const input = 'capitalise this string';
    const output = 'Capitalise This String';

    // Expectation
    expect(stringCapitalize(input)).toEqual(output);
  });
});
