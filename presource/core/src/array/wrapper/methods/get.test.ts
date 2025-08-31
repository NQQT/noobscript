import { describe, test, expect } from '@jest/globals';
import { arrayWrapper } from '..';

describe('Get Function of Array Wrapper', () => {
  const example = ['apple', 'banana', 'cat', 'dog', true, false, 0, 1, 2, 3];
  const $array = arrayWrapper();

  test('Basic get command', () => {
    const wrapper = $array(example);
    // Standard get functionality
    expect(wrapper.get()).toStrictEqual(['apple', 'banana', 'cat', 'dog', true, false, 0, 1, 2, 3]);
    // If use true, it will match only value that is considered true
    expect(wrapper.get(true)).toStrictEqual(['apple', 'banana', 'cat', 'dog', true, 1, 2, 3]);
    // Likewise, if false, will get value that closer to false
    expect(wrapper.get(false)).toStrictEqual([false, 0]);
  });

  test('Odd and even string query', () => {
    const wrapper = $array(example);
    // There are some build in function for string format
    expect(wrapper.get('odd')).toStrictEqual(['banana', 'dog', false, 1, 3]);
    expect(wrapper.get('even')).toStrictEqual(['apple', 'cat', true, 0, 2]);
  });

  test('Valid and invalid string query', () => {
    const wrapper = $array([null, undefined, 0, false, true, 1, 'apple']);
    expect(wrapper.get('valid')).toStrictEqual([0, false, true, 1, 'apple']);
    expect(wrapper.get('invalid')).toStrictEqual([null, undefined]);
  });

  test('Using array to get values', () => {
    const wrapper = $array(['apple', 'banana', null, undefined, false, true, 0, 1, 2, 3]);
    expect(wrapper.get([true, false])).toStrictEqual(['apple', 'banana', null, undefined, false, true, 0, 1, 2, 3]);
    expect(wrapper.get(['odd', 'even'])).toStrictEqual(['apple', 'banana', null, undefined, false, true, 0, 1, 2, 3]);
    // Getting odd and valid, thus returning result with undefined
    expect(wrapper.get(['odd', 'valid'])).toStrictEqual(['apple', 'banana', undefined, false, true, 0, 1, 2, 3]);
  });
});
