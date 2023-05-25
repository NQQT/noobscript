import { describe, test, expect } from '@jest/globals';
import { objectHasKey } from './has';

describe('Object Has', () => {
  const example = { a: 'apple', b: 'banana', c: 'cat', d: 'dog' };

  test('Object has key', () => {
    expect(objectHasKey(example, 'a')).toBeTruthy();
    expect(objectHasKey(example, 'e')).toBeFalsy();
  });
});
