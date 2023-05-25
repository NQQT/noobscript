import { describe, test, expect } from '@jest/globals';
import { arrayWrapper } from '..';

describe('For extracting keys from an array function', () => {
  const example = ['apple', 'banana', 'cat', 'dog', true, false, 0, 1, 2, 3];
  const $array = arrayWrapper();

  test('Basic get command', () => {
    const wrapper = $array(example);
    // If no argument, it will return the list of all keys
    expect(wrapper.keys()).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    // If true boolean is set, it will return keys that can evaluated to be true
    expect(wrapper.keys(true)).toStrictEqual([0, 1, 2, 3, 4, 7, 8, 9]);
    // Likewise, if false, will get keys that closer to false
    expect(wrapper.keys(false)).toStrictEqual([5, 6]);
  });

  test('Odd and even string query', () => {
    const wrapper = $array(example);
    // There are some build in function for string format
    expect(wrapper.keys('odd')).toStrictEqual([1, 3, 5, 7, 9]);
    expect(wrapper.keys('even')).toStrictEqual([0, 2, 4, 6, 8]);
  });

  test('Valid and invalid string query', () => {
    const wrapper = $array([null, undefined, 0, false, true, 1, 'apple']);
    expect(wrapper.keys('valid')).toStrictEqual([2, 3, 4, 5, 6]);
    expect(wrapper.keys('invalid')).toStrictEqual([0, 1]);
  });

  test('Using array to get values', () => {
    const wrapper = $array(['apple', 'banana', null, undefined, false, true, 0, 1, 2, 3]);
    expect(wrapper.keys([true, false])).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(wrapper.keys(['odd', 'even'])).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    // Getting odd and valid, thus returning result without key where undefined exists
    expect(wrapper.keys(['odd', 'valid'])).toStrictEqual([0, 1, 3, 4, 5, 6, 7, 8, 9]);
  });
});
