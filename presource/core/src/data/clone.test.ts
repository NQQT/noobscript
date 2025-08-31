import { describe, expect, test } from '@jest/globals';
import { dataClone } from '@presource/core';

describe('Data cloning', () => {
  test('Cloning primitive datas', () => {
    expect(dataClone(1)).toBe(1);
    expect(dataClone('apple')).toBe('apple');
  });

  test('Cloning data arrays', () => {
    // Basic Array Check
    expect(dataClone([])).toStrictEqual([]);
    expect(dataClone([1, 2, 3])).toStrictEqual([1, 2, 3]);
  });

  test('Cloning data objects', () => {
    expect(dataClone({})).toMatchObject({});
    expect(dataClone({ a: 'apple' })).toMatchObject({ a: 'apple' });
  });
});
