import { describe, expect, test, jest } from '@jest/globals';
import { functionDelay } from './delay';

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

  //   test("Function Delayed Within",()=>{
  //       expect.assertions(2);
  //       functionDelay(()=>{
  //           expect(true);
  //       })
  //   })
});
