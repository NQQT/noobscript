import { describe, expect, test } from '@jest/globals';
import { jsonUpdate, UNDEFINED } from '@presource/core';

describe('Basic jsonMerge Test', () => {
  test('Merging and Overwriting Simple Data', () => {
    // Undefined Primary Merging
    expect(jsonUpdate(UNDEFINED, 'string')).toBe('string');
    expect(jsonUpdate(UNDEFINED, [])).toStrictEqual([]);
    expect(jsonUpdate(UNDEFINED, {})).toStrictEqual({});

    // Standard Object Merging
    expect(jsonUpdate({ a: 1 }, { b: 2 })).toStrictEqual({ a: 1, b: 2 });
    // Standard Array Merging
    expect(jsonUpdate([{ a: 1 }], [{ b: 2 }])).toStrictEqual([{ a: 1, b: 2 }]);

    // Simple Overwrite
    expect(jsonUpdate('first', 'second')).toBe('second');
    expect(jsonUpdate({ a: 1 }, { a: 2 })).toStrictEqual({ a: 2 });

    // Simple Check whether exist
    expect(jsonUpdate({ a: 1 }, { b: ['joe', 'mate'] })).toStrictEqual({ a: 1, b: ['joe', 'mate'] });
    expect(jsonUpdate({ a: 1, b: 'ben' }, { b: ['joe', 'mate'] })).toStrictEqual({ a: 1, b: ['joe', 'mate'] });
  });

  test('Advance Merging of Data', () => {
    const originalData = {
      items: [
        { bag: 1, cash: 100, owner: 'jackson' },
        { bag: 2, cash: 50, owner: 'ben' },
      ],
    };

    // Updating Bag 1 with cash 80.
    expect(jsonUpdate(originalData, { items: [{ bag: 1, cash: 80 }] })).toStrictEqual({
      items: [
        { bag: 1, cash: 80, owner: 'jackson' },
        { bag: 2, cash: 50, owner: 'ben' },
      ],
    });
  });
});
