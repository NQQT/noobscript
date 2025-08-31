import { describe, expect, jest, test } from '@jest/globals';
import { functionDelay } from '@presource/core';

describe('Delaying Function', () => {
  // Using Jest fake timer
  jest.useFakeTimers();

  // Testing if function is delayed correctly
  test('Function Delayed Correctly', () => {
    expect.assertions(1);
    // Trigger Once
    functionDelay(() => {
      expect(true).toBe(true);
    });
    jest.runOnlyPendingTimers();
  });
});
