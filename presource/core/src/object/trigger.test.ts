import { describe, expect, test } from '@jest/globals';
import { objectTrigger } from './trigger';

describe('Object Trigger', () => {
  test('Basic trigger', () => {
    const data = { apple: 1, banana: 2 };
    let counter = 0;
    const result = objectTrigger(data, {
      // If there is apple, it will trigger this
      apple: () => {
        counter++;
      },
    });

    // If system returns nothing. Only banana is left.
    expect(result).toStrictEqual({ banana: 2 });
  });

  test('Can be used to construct new object based on old one', () => {
    const data = { apple: '1', banana: '2' };
    // The Output should be the following
    expect({ apple: '1', banana: 'done' }).toStrictEqual(
      // Constructing Object
      objectTrigger(data, {
        banana: () => {
          return { banana: 'done' };
        },
      }),
    );

    // The Output should be the following
    expect({ apple: '1', orange: '2' }).toStrictEqual(
      // Constructing Object
      objectTrigger(data, {
        banana: () => {
          return { orange: '2' };
        },
      }),
    );
  });
});
