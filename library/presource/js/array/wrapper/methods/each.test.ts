import { describe, test, expect } from '@jest/globals';
import { arrayWrapper } from '..';
import { isEqual } from '../../../is/equal';

describe('Array Wrapper Each Function', () => {
  // Standard Array Wrapper
  const $array = arrayWrapper();
  // Example Array
  const example = ['apple', 'banana', 'cat', 'dog'];

  test('Basic usage of each function', () => {
    const result: string[] = [];
    $array(example).each(({ v }) => {
      result.push(v);
    });
    // Expecting the return to be the same
    expect(result).toStrictEqual(example);
  });

  test('Can break prematurely like standard arrayEach', () => {
    const result: string[] = [];
    $array(example).each(({ v }) => {
      if (isEqual(v, 'banana')) return null;
      result.push(v);
    });
    expect(result).toStrictEqual(['apple']);
  });
});
