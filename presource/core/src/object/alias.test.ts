import { describe, test, expect } from '@jest/globals';
import { objectAlias } from './alias';

describe('Object Alias Test', () => {
  test('Object aliasing', () => {
    const data = {
      index: 1,
      count: 2,
      length: 3,
    };

    // Creating an alias object with the follow abreviations
    const alias = objectAlias(data, {
      i: 'index',
      c: 'count',
      l: 'length',
    });

    const checkMatching = () => {
      expect(alias.i).toBe(alias.index);
      expect(alias.c).toBe(alias.count);
      expect(alias.l).toBe(alias.length);
    };

    // First Check
    checkMatching();

    data.count++;
    checkMatching();

    alias.index++;
    checkMatching();

    alias.l = 10;
    checkMatching();

    // Expecting the Final Result to be
    expect(data).toStrictEqual({
      index: 2,
      count: 3,
      length: 10,
    });

    // JSON of data and alias should match
    expect(JSON.stringify(data)).toStrictEqual(JSON.stringify(alias));
  });
});
