import { describe, test, expect } from '@jest/globals';
import { arrayWrapper } from '..';

describe('Count function of array Wrapper', () => {
  const example = ['apple', 'banana', 'cat', 'dog', true, true, undefined, 1, 2, 3, 4, 5, 6, 7];
  const $array = arrayWrapper();

  test('Basic counting primitive', () => {
    // Count total value to be 14
    expect($array(example).count()).toBe(14);

    expect($array(example).count('string')).toBe(4);
    expect($array(example).count('boolean')).toBe(2);
    expect($array(example).count('number')).toBe(7);
    expect($array(example).count('invalid')).toBe(1);
    expect($array(example).count('valid')).toBe(13);
  });
});
