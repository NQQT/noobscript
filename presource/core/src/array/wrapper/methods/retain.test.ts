import { describe, test, expect } from '@jest/globals';
import { arrayWrapper } from '..';
import { isEqual } from '../../../is/equal';

describe('Filter function of array Wrapper', () => {
  const sample = ['apple', 'banana', 'cat', 'dog', 1, 2, 3, 4, null, undefined, true, false];
  const $array = arrayWrapper();

  test('Basic usage of filter function', () => {
    const example = [...sample];
    $array(example).retain(({ v }: any) => {
      // Filtering out apple
      return isEqual(v, 'apple');
    });
    // Example should be apple
    expect(example).toStrictEqual(['apple']);
  });
});
