import { describe, test, expect } from '@jest/globals';
import { typeSwitch } from './switch';

describe('Type Switch Checking', () => {
  // Checking if Type is Correct
  test('Checking type returned correctly', () => {
    // Undefined
    expect(
      typeSwitch(undefined, {
        undefined: () => 'invalid',
      }),
    ).toBe('invalid');

    // Null
    expect(
      typeSwitch(null, {
        null: () => 'invalid',
      }),
    ).toBe('invalid');

    // Checking String Type
    expect(
      typeSwitch('string', {
        string: ({ value }) => value,
      }),
    ).toBe('string');

    // Object Type
    expect(
      typeSwitch(
        { a: 'a' },
        {
          object: ({ value }) => value.a,
        },
      ),
    ).toBe('a');

    // Not Found. Undefined
    expect(typeSwitch('a', { default: ({ value }) => value })).toBe('a');
  });

  // Checking the nested type are correct
  test('Checking nested type are correct', () => {
    // Checking String
    typeSwitch('string', {
      string: ({ value, v }) => {
        expect(value).toBe('string');
        expect(v).toBe('string');
      },
    });
    // Checking for Number
    typeSwitch(10, {
      number: ({ value, v }) => {
        expect(value).toBe(10);
        expect(v).toBe(10);
      },
    });
    // Checking for Boolean
    typeSwitch(true, {
      boolean: ({ value, v }) => {
        expect(value).toBe(true);
        expect(v).toBe(true);
      },
    });
    typeSwitch(false, {
      boolean: ({ value, v }) => {
        expect(value).toBe(false);
        expect(v).toBe(false);
      },
    });

    // Checking for Function
    const func = () => {};
    typeSwitch(func, {
      function: ({ value, v }) => {
        expect(value).toEqual(func);
        expect(v).toEqual(func);
      },
    });
  });

  test('Number route switching', () => {
    // Number switching route
    expect(
      typeSwitch('string', {
        number: ({ v }) => v,
        string: ({ number }) => number(5),
      }),
    ).toBe(5);

    // Can also use initial
    expect(
      typeSwitch('string', {
        number: ({ v }) => v,
        string: ({ N }) => N(5),
      }),
    ).toBe(5);
  });

  // Switching Routs
  test('Boolean route switching', () => {
    // Boolean route switching
    expect(
      typeSwitch('string', {
        boolean: ({ v }) => v,
        string: ({ boolean }) => boolean(true),
      }),
    ).toBe(true);

    // Boolean route switching
    expect(
      typeSwitch('string', {
        boolean: ({ v }) => v,
        string: ({ B }) => B(false),
      }),
    ).toBe(false);
  });
});
