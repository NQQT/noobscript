import { describe, test, expect } from '@jest/globals';
import { objectCreate } from './create';

describe('Object Create Test', () => {
  test('Basic Object Creation with Primitive values', () => {
    // Create 1 to 1 value with simple string
    expect(objectCreate('test', 'test')).toStrictEqual({ test: 'test' });
    // Create multiple to 1 value with number
    expect(objectCreate(5, 'test')).toStrictEqual({ 0: 'test', 1: 'test', 2: 'test', 3: 'test', 4: 'test' });
  });

  test('Using array object to create', () => {
    // Primitive to array or array to primitive
    expect(objectCreate(5, ['a', 'b', 'c', 'd', 'e'])).toStrictEqual({ 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e' });
    expect(objectCreate('key', ['a', 'b', 'c'])).toStrictEqual({ key: 'a' });

    // Array should match up. If not, Some will be truncated
    expect(objectCreate([1, 2, 3, 4, 5], [1, 2, 3, 4, 5])).toStrictEqual({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });
    expect(objectCreate([1, 2, 3, 4], [1, 2, 3, 4, 5])).toStrictEqual({ 1: 1, 2: 2, 3: 3, 4: 4 });
    expect(objectCreate([1, 2, 3, 4], 'value')).toStrictEqual({ 1: 'value', 2: 'value', 3: 'value', 4: 'value' });
    expect(objectCreate([1, 2, 3, 4], () => 'value')).toStrictEqual({ 1: 'value', 2: 'value', 3: 'value', 4: 'value' });
    expect(objectCreate([1, 2, 3, 4], null)).toStrictEqual({ 1: null, 2: null, 3: null, 4: null });
    expect(objectCreate([1, 2, 3, 4], undefined)).toStrictEqual({
      1: undefined,
      2: undefined,
      3: undefined,
      4: undefined,
    });
    expect(objectCreate([1, 2, 3, 4], true)).toStrictEqual({
      1: true,
      2: true,
      3: true,
      4: true,
    });
  });

  test('Using with callback functions', () => {
    // Can be used with function to recreate
    expect(objectCreate([1, 2, 3, 4], [0, 1, 2, 3])).toStrictEqual(objectCreate([1, 2, 3, 4], ({ i }) => i));

    expect(objectCreate([1, 2, 3, 4], [1, 2, 3, 4])).toStrictEqual(objectCreate([1, 2, 3, 4], ({ v }) => v));

    // Any value can be returned with functions
    expect(objectCreate('key', () => 'value')).toStrictEqual({ key: 'value' });
    expect(objectCreate('key', () => [1, 2, 3, 4, 5])).toStrictEqual({ key: [1, 2, 3, 4, 5] });
    expect(objectCreate(3, () => [1, 2, 3, 4, 5])).toStrictEqual({
      0: [1, 2, 3, 4, 5],
      1: [1, 2, 3, 4, 5],
      2: [1, 2, 3, 4, 5],
    });
  });
});
