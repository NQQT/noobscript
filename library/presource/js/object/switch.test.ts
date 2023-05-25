import { describe, expect, test } from '@jest/globals';
import { objectSwitch } from './switch';

describe('Object Switch Functionality', () => {
  test('Basic Switch Route', () => {
    const item = {
      a: 'apple',
      b: 'banana',
    };

    expect(objectSwitch(item, { a: () => 'found apple' })).toBe('found apple');
    expect(objectSwitch(item, { b: () => 'found banana' })).toBe('found banana');
    expect(objectSwitch(item, { a: () => 'found apple', b: () => 'found banana' })).toBe('found apple');
    // Switching route is possible due to return value.
    // If value is returned, it will skip the rest of the route!
  });

  test('Multi Switching Route', () => {
    const item = {
      b: 'bat',
      c: 'cat',
      d: 'dog',
      e: 'elephant',
    };

    const result: string[] = [];
    // If no value is being returned, then it will continue to hit all possible keys
    objectSwitch(item, {
      a: () => {
        result.push('a');
      },
      b: () => {
        result.push('b');
      },
      c: () => {
        result.push('c');
      },
      d: () => {
        result.push('d');
      },
      e: () => {
        result.push('e');
      },
    });

    // Expecting the Result to Equal BCDE
    expect(result).toStrictEqual(['b', 'c', 'd', 'e']);
  });
});
