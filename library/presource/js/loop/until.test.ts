import { describe, test, expect } from '@jest/globals';
import { loopUntil } from './until';

describe('Until Loop (Basic)', () => {
  // Basic While Looping
  test('Should loop until value = 5', () => {
    let value = 0;
    const targetedValue = 5;

    // Running Condition Check
    const condition = () => value === targetedValue;
    // Continously Incrementing until Condition is Meet.
    // Not that undefined will trigger break loop
    loopUntil(condition, () => {
      value++;
    });
    // Expecting Value to be Targted Value
    expect(value).toBe(targetedValue);
  });
});
