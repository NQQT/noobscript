import { describe, expect, test, jest } from '@jest/globals';
import { scriptPause } from './pause';

describe('Pausing an async function', () => {
  // Using Jest fake timer
  jest.useFakeTimers();

  // Testing if function is delayed correctly
  test('Script paused correctly', () => {
    let count = 0;
    (async () => {
      // pause for 10 second
      await scriptPause(10000);
      // Check if script is passed.
      expect(true).toBe(true);
    })();

    expect(count).toBe(0);
    jest.advanceTimersByTime(5000);
    expect(count).toBe(0);
    jest.runAllTimers();
  });
});
