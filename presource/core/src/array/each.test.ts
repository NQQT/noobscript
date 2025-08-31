import { describe, test, expect } from '@jest/globals';
import { scriptPause } from '../script/pause';
import { arrayCreate } from './create';
import { arrayEach, arrayEachAsync } from './each';

describe('Basic Usage of arrayEach', () => {
  test('Loop through every value and add together', () => {
    let total = 0;
    arrayEach([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], ({ value }) => {
      total += value;
    });
    // Expect Summation to Equal up
    expect(total).toBe(55);

    let count = 0;
    let message = '';
    arrayEach(['s', 'u', 'c', 'c', 'e', 's', 's'], ({ value, index }) => {
      message += value;
      count += index;
    });

    expect(message).toBe('success');
    expect(count).toBe(21);
  });

  // Expect End prematurely and return result

  test('Return Proper Value', () => {
    // Scanning Through Array. If Value hit greater than 5. Return it. So it is 6
    expect(
      arrayEach([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], ({ value }) => {
        if (value > 5) return value;
      }),
    ).toBe(6);
  });
});

describe('Advance usage of arrayEach', () => {
  test('Prematurely End Loop', () => {
    let count = 0;
    arrayEach(arrayCreate(12), (data) => {
      // Incrementing Count
      count++;
      // Set Data.length to 0. Automatically Stop
      data.length = 0;
    });
    // Exepect One to Go Through
    expect(count).toBe(1);
  });
});

// Async Usage of arrayEach
describe('Async Usage of arrayEach', () => {
  // Testing Async callback
  test('Async Callback', async () => {
    let count = 0;
    await arrayEachAsync(arrayCreate(12), async () => {
      count++;
    });
    expect(count).toBe(12);
  });

  test('Async callback with', async () => {
    let count = 0;
    const result: any[] = [];
    await arrayEachAsync(arrayCreate(12), async ({ index }) => {
      count++;
      await scriptPause(100);
      result.push(index);
    });
    expect(count).toBe(12);
    expect(result).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });
});
