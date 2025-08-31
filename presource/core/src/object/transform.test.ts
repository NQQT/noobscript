import { describe, expect, test } from '@jest/globals';
import { objectTransform } from './transform';
import { objectScan } from './scan';
import { isEqual } from '../is/equal';

describe('objectTransform', () => {
  test('Simple transformation 1', () => {
    const input = { a: 'apple', b: 'banana' };
    const transformer = {
      a: ({ value }: any) => value + '1',
      b: ({ value }: any) => value + '2',
    };

    expect(objectTransform(input, transformer)).toStrictEqual({
      a: 'apple1',
      b: 'banana2',
    });
  });

  test('Simple transformation 2', () => {
    const input = { a: 'apple', b: 'banana' };
    const transformer = {
      c: 'cat',
      d: () => 'dog',
    };
    const output = objectTransform(input, transformer);

    expect(output).toStrictEqual({
      c: 'cat',
      d: 'dog',
    });

    expect({ ...input, ...output }).toStrictEqual({
      a: 'apple',
      b: 'banana',
      c: 'cat',
      d: 'dog',
    });
  });

  test('Simple transformation 3', () => {
    const input = { a: 'apple', b: 'banana' };
    const transform = {
      a: {
        1: 'a',
        2: 'p',
        3: 'p',
        4: 'l',
        5: 'e',
      },
    };
    // Get the output
    const output = objectTransform(input, transform);
    expect(output).toStrictEqual({
      a: { 1: 'a', 2: 'p', 3: 'p', 4: 'l', 5: 'e' },
    });
  });

  test('Basic access to nested data for transformation', () => {
    const input = { a: 'apple', b: 'banana', c: 'cat', d: 'dog' };
    const transformer = {
      level: ({ key, input }: any) => {
        // Expecting transformation
        expect(key).toBe('level');
        expect(input).toStrictEqual({ a: 'apple', b: 'banana', c: 'cat', d: 'dog' });
        return true;
      },
      nested: {
        one: (_: any, { key, input }: any) => {
          // One level up
          expect(key).toBe('nested');
          expect(input).toStrictEqual({ a: 'apple', b: 'banana', c: 'cat', d: 'dog' });
          return true;
        },
        two: () => true,
      },
    };

    const output = objectTransform(input, transformer);
    expect(output).toStrictEqual({
      level: true,
      nested: {
        one: true,
        two: true,
      },
    });
  });

  test('More complex nested data access', () => {
    // This is the input
    const input = {
      subjects: { math: { teachers: 2, students: 5 }, english: { teachers: 4, students: 10 } },
      electives: { biology: { teachers: 1, students: 5 }, chemistry: { teachers: 3, students: 4 } },
    };

    const output = objectTransform(input, {
      teachers: ({ input }) => {
        let count = 0;
        objectScan(input, ({ key, value }) => {
          if (isEqual(key, 'teachers')) {
            count += value;
          }
        });
        return count;
      },
      students: ({ input }) => {
        let count = 0;
        objectScan(input, ({ key, value }) => {
          if (isEqual(key, 'students')) {
            count += value;
          }
        });
        return count;
      },
    });

    expect(output).toStrictEqual({
      teachers: 10,
      students: 24,
    });
  });

  test('Use transform to resolve values within object', () => {
    const output = objectTransform(
      {},
      {
        apple: ({ output }) => {
          const { banana } = output;
          if (banana) return 'apple';
        },
        banana: () => {
          return 'banana';
        },
      },
    );

    expect(output).toStrictEqual({
      apple: 'apple',
      banana: 'banana',
    });
  });
});
