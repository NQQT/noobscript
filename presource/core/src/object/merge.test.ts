import { describe, test, expect } from '@jest/globals';
import { objectMerge } from './merge';

describe('objectMerge', () => {
  test('Merging with single level objects', () => {
    const object1 = { a: 1, b: 2, c: 3 };
    const object2 = { d: 4, e: 5, f: 6 };
    const object3 = { a: 'a', e: 'e', g: 'g' };
    // Concating Items together
    expect(objectMerge(object1, object2)).toStrictEqual({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 });
    // Object 1 and 2 should remain unchanged
    expect(object1).toStrictEqual({ a: 1, b: 2, c: 3 });
    expect(object2).toStrictEqual({ d: 4, e: 5, f: 6 });

    // Overwriting
    expect(objectMerge(object1, object2, object3)).toStrictEqual({ a: 'a', b: 2, c: 3, d: 4, e: 'e', f: 6, g: 'g' });
    // Object 1, 2 and 3 should still be the same
    expect(object1).toStrictEqual({ a: 1, b: 2, c: 3 });
    expect(object2).toStrictEqual({ d: 4, e: 5, f: 6 });
    expect(object3).toStrictEqual({ a: 'a', e: 'e', g: 'g' });
  });

  test('Merging with multiple nested objects', () => {
    const fruitList1 = { fruits: { a: { apple: 1 }, b: { banana: 2 } } };
    const fruitList2 = { fruits: { o: { orange: 1 }, p: { pineapple: 2 } } };
    const fruitList3 = { fruits: { a: { appricot: 1 }, p: { pears: 2 } } };

    expect(objectMerge(fruitList1, fruitList2)).toStrictEqual({
      fruits: {
        a: { apple: 1 },
        b: { banana: 2 },
        o: { orange: 1 },
        p: { pineapple: 2 },
      },
    });

    expect(objectMerge(fruitList2, fruitList3)).toStrictEqual({
      fruits: {
        a: { appricot: 1 },
        p: { pears: 2, pineapple: 2 },
        o: { orange: 1 },
      },
    });

    expect(objectMerge(fruitList1, fruitList2, fruitList3)).toStrictEqual({
      fruits: {
        a: { apple: 1, appricot: 1 },
        b: { banana: 2 },
        o: { orange: 1 },
        p: { pineapple: 2, pears: 2 },
      },
    });
  });
});
