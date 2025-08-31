import { describe, expect, test } from '@jest/globals';
import { ifTrue, ifFalse } from './if';

describe('If Condition Test', () => {
  test('Condition is true', () => {
    expect(ifTrue(true, () => 'test')).toBe('test');
    expect(ifFalse(true, () => 'test')).toBeUndefined();
  });
});
