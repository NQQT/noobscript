import { describe, test, expect } from '@jest/globals';
import { typeSwitchAsync } from './switchAsync';

describe('Type Switch in Async format', () => {
  test('Value is returned correctly with undefined', async () => {
    const result = await typeSwitchAsync(undefined, {
      undefined: async () => 'invalid',
    });
    expect(result).toBe('invalid');
  });

  test('value is returned correctly with null', async () => {
    const result = await typeSwitchAsync(null, {
      null: async () => 'invalid',
    });
    expect(result).toBe('invalid');
  });
});

describe('Type Switch Checking', () => {
  // Checking if Type is Correct
  test('Checking type returned correctly', async () => {
    // Checking String Type
    expect(
      await typeSwitchAsync('string', {
        string: async ({ value }) => value,
      }),
    ).toBe('string');

    // Object Type
    expect(
      await typeSwitchAsync(
        { a: 'a' },
        {
          object: async ({ value }) => value.a,
        },
      ),
    ).toBe('a');

    // Not Found. Undefined
    expect(await typeSwitchAsync('a', { default: async ({ value }) => value })).toBe('a');
  });

  // Checking the nested type are correct
  test('Checking nested type are correct', async () => {
    // Checking String
    await typeSwitchAsync('string', {
      string: async ({ value, v }) => {
        expect(value).toBe('string');
        expect(v).toBe('string');
      },
    });
    // Checking for Number
    await typeSwitchAsync(10, {
      number: async ({ value, v }) => {
        expect(value).toBe(10);
        expect(v).toBe(10);
      },
    });
    // Checking for Boolean
    await typeSwitchAsync(true, {
      boolean: ({ value, v }) => {
        expect(value).toBe(true);
        expect(v).toBe(true);
      },
    });
    await typeSwitchAsync(false, {
      boolean: ({ value, v }) => {
        expect(value).toBe(false);
        expect(v).toBe(false);
      },
    });

    // Checking for Function
    const func = () => {};
    await typeSwitchAsync(func, {
      function: ({ value, v }) => {
        expect(value).toEqual(func);
        expect(v).toEqual(func);
      },
    });
  });

  test('Number route switching', async () => {
    // Number switching route
    expect(
      await typeSwitchAsync('string', {
        number: ({ v }) => v,
        string: async ({ number }) => number(5),
      }),
    ).toBe(5);

    // Can also use initial
    expect(
      await typeSwitchAsync('string', {
        number: ({ v }) => v,
        string: async ({ N }) => N(5),
      }),
    ).toBe(5);
  });

  // Switching Routs
  test('Boolean route switching', async () => {
    // Boolean route switching
    expect(
      await typeSwitchAsync('string', {
        boolean: ({ v }) => v,
        string: ({ boolean }) => boolean(true),
      }),
    ).toBe(true);

    // Boolean route switching
    expect(
      await typeSwitchAsync('string', {
        boolean: ({ v }) => v,
        string: ({ B }) => B(false),
      }),
    ).toBe(false);
  });
});
