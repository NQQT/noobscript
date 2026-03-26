import { arrayCreate } from '@presource/core';

describe('arrayCreate Requirement', () => {
  test('Creating an array with various inputs', () => {
    // Create a New Array
    expect(arrayCreate()).toStrictEqual([]);

    // Creating an Array with Length of 5
    expect(arrayCreate(5).length).toBe(5);

    // When Accepting Function
    const array = arrayCreate(({ index }) => {
      if (index < 5) return index;
    });
    expect(array.length).toBe(5);
    expect(array).toStrictEqual([0, 1, 2, 3, 4]);
  });
});
