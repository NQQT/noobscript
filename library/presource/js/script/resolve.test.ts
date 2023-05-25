import { describe, expect, test } from '@jest/globals';
import { scriptResolve } from './resolve';

describe('Callback resolver', () => {
  test('wait until value is resolved', async () => {
    // Returning the Apple
    expect(
      await scriptResolve(() => {
        return 'apple';
      }),
    ).toBe('apple');

    let counter = 0;
    expect(
      await scriptResolve(({ count }) => {
        // Increasing the Counter
        if (count < 10) {
          counter++; // Increment to check
          return;
        }
        return 'banana';
      }),
    ).toBe('banana');

    // Expecting the counter to reach 10
    expect(counter).toBe(10);
  });
});
