import { describe, expect, test } from '@jest/globals';
import { objectEach, objectEachAsync } from './each';
import { scriptPause } from '../script/pause';

describe('Object Each', () => {
  const example = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
  };

  // Testing Loop Through Object
  test('Loop Through Object', () => {
    let string = '';
    let number = 0;
    const result = objectEach(example, ({ key, value }) => {
      string += key;
      number += value;
    });
    expect(result).toBe(undefined);
    expect(string).toBe('abcdef');
    expect(number).toBe(21);
  });

  test('Return prematurely', () => {
    const result = objectEach(example, ({ value }) => {
      if (value >= 3) return value;
    });
    expect(result).toBe(3);
  });
});

describe('Object each Async', () => {
  const example = { a: 'apple', b: 'banana', c: 'cat', d: 'dog', e: 'electron' };
  test('Loop through correctly', async () => {
    let count = 0;
    await objectEachAsync(example, async () => {
      count++;
    });
    expect(count).toBe(5);
  });

  test('Waiting for others to resolve before continuing', async () => {
    const result: string[] = [];
    let count = 0;
    await objectEachAsync(example, async ({ value }) => {
      count++;
      await scriptPause(100);
      result.push(value);
    });
    expect(count).toBe(5);
    expect(result).toStrictEqual(['apple', 'banana', 'cat', 'dog', 'electron']);
  });
});
