import { describe, test, expect } from '@jest/globals';
import { objectKeys } from './keys';

describe('Object Keys', () => {
  const example = {
    a: 'apple',
    b: 'banana',
    c: 'cat',
    d: 'dog',
    e: 'eva',
    f: 'frank',
  };
  test('Basic Keys Extraction', () => {
    const keys = objectKeys(example);
    // Accessing Keys
    expect(keys).toStrictEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });
});
