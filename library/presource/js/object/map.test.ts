import { describe, test, expect } from '@jest/globals';
import { objectMap } from './map';

describe('Object Mapping Function (similiar to Array.map', () => {
  const example = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
  };

  test('Remapping Number. Increase value by one', () => {
    const result = objectMap(example, ({ value }) => value + 1);
    expect(result).toEqual({ a: 2, b: 3, c: 4, d: 5, e: 6, f: 7 });
  });

  test('Remapping Number. Decrease value by one', () => {
    const result = objectMap(example, ({ value }) => value - 1);
    expect(result).toEqual({ a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 });
  });

  test('Remapping value. Change Value to Key', () => {
    const result = objectMap(example, ({ key }) => key);
    expect(result).toEqual({ a: 'a', b: 'b', c: 'c', d: 'd', e: 'e', f: 'f' });
  });
});
