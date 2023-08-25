import { describe, expect, jest, test } from '@jest/globals';
import { functionQueue } from './queue';

describe('Testing Function Queue', () => {
  // Simulating Fake Time
  jest.useFakeTimers();
  test('Checking if it is loading correctly', () => {
    // Creating a Function Queue
    const queue = functionQueue();
    const result: any = [];
    queue(() => {
      result.push(1);
    });
    // Run All Timer
    jest.runAllTimers();
    // Checking the Result to be Equal
    expect(result).toStrictEqual([1]);
  });

  test('Queue functions in series calls', () => {
    // Creating a new queue
    const queue = functionQueue();
    const result: any = [];

    queue(() => {
      result.push(1);
    });

    queue(() => {
      result.push(2);
    });

    queue(() => {
      result.push(3);
    });

    jest.runAllTimers();
    expect(result).toStrictEqual([1, 2, 3]);
  });

  test('Queue funtions in nested series', () => {
    const queue = functionQueue();
    const result: any = [];

    queue(() => {
      result.push(1);

      // Add some children
      queue(() => {
        result.push(1.1);
      });
      queue(() => {
        result.push(1.2);
      });
    });

    queue(({ queue }) => {
      result.push(2);
      // Using pass down queue handler should also work
      queue(() => {
        result.push(2.1);
      });
      queue(() => {
        result.push(2.2);
      });
    });

    // Executing all timer
    jest.runAllTimers();
    // Expecting Result in Order of Processing
    expect(result).toStrictEqual([1, 1.1, 1.2, 2, 2.1, 2.2]);
  });

  test('On complete trigger', () => {
    const result: string[] = [];
    const queue = functionQueue({
      complete: () => {
        result.push('done');
      },
    });

    queue(() => {
      result.push('apple');
    });

    queue(() => {
      result.push('banana');
    });

    jest.runAllTimers();
    expect(result).toStrictEqual(['apple', 'banana', 'done']);
  });
});
