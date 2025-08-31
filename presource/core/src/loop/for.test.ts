import { describe, expect, test } from '@jest/globals';
import { loopFor, loopForAsync } from '@presource/core';

// These are basic cases loopFor
describe('For Loop (Basic)', () => {
  test('Should loop until the end', () => {
    let count = 0;
    loopFor(10, () => {
      count++;
    });
    expect(count).toBe(10);
  });

  test('Loop until end, return undefined', () => {
    const result = loopFor(10, () => {});
    expect(result).toBe(undefined);
  });

  test('Loop break prematurely, return result', () => {
    const result = loopFor(10, ({ index }) => {
      if (index >= 5) return index;
    });
    expect(result).toBe(5);
  });
});

// These are advance cases.
describe('Loop For (Advance)', () => {
  test('Loop break prematurely due to re-nesting', () => {
    let count = 0;
    const result = loopFor(10, (data) => {
      const { f, i } = data;
      if (i >= 5) return i;
      count++;
      // Overwriting Index
      return f({ ...data, i: 5 });
    });
    expect(count).toBe(1);
    expect(result).toBe(5);
  });

  test('Loop break prematurely due to overwriting params', () => {
    let count = 0;
    // Scanning the Result
    const result = loopFor(10, (data) => {
      count++;
      // Updating the Data Object Directly
      data.length = 0; // Set Length to Zero will automatically break the loop
    });
    expect(count).toBe(1);
    expect(result).toBeUndefined();
  });
});

/** Test cases for async function */

describe('Loop For Async Usage', () => {
  test('Loop correctly', async () => {
    let count = 0;
    const result = await loopForAsync(10, async () => {
      count++;
    });
    expect(count).toBe(10);
    expect(result).toBeUndefined();
  });

  test('Loop correctly with break prematurely', async () => {
    let count = 0;
    const result = await loopForAsync(10, async () => {
      count++;
      if (count > 5) {
        return false;
      }
    });
    expect(count).toBe(6);
    expect(result).toBeFalsy();
  });
});
