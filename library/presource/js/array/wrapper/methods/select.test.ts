import { describe, test, expect } from '@jest/globals';
import { arrayWrapper } from '..';

describe('Array Wrapper Select Function', () => {
  // Standard Array Wrapper
  const $array = arrayWrapper();
  // Example Array
  const sample = ['apple', 'banana', 'cat', 'dog'];

  test('Basic usage of select functionality', () => {
    // Basic Selection by Index
    expect($array(sample).select(0).get()).toStrictEqual(['apple']);

    // Selecting Multiple Indexes
    expect($array(sample).select([0, 2]).get()).toStrictEqual(['apple', 'cat']);
  });

  test('Chaining with each functionality', () => {
    // Selecting Apple
    const result: string[] = [];
    $array(sample)
      .select(0)
      .each(({ v }) => {
        result.push(v);
      });
    expect(result).toStrictEqual(['apple']);

    // Multiple Select
    $array(sample)
      .select([2, 3])
      .each(({ v }) => {
        result.push(v);
      });
    expect(result).toStrictEqual(['apple', 'cat', 'dog']);
  });

  test('Chaining with remove functionality', () => {
    const example = [...sample];
    // Remove apple
    $array(example).select(0).remove();
    expect(example).toStrictEqual(['banana', 'cat', 'dog']);
  });
});
