import { describe, expect, jest } from '@jest/globals';
import { functionQueue } from '@presource/core';

describe('How to use Function Queue - ability to queue function in a list', () => {
  // We will need to simulate some fate timer first.
  jest.useFakeTimers();

  it('can be used to queue a function, running it later', () => {
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

  it('should be able to queue function in a series', () => {
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

  it('should be able to queue a function in a nested series', () => {
    // Let's create a queue list
    const queue = functionQueue();
    // this is for testing the result at the end.
    const result: number[] = [];

    // Let's queue an item
    queue(() => {
      // Adding first item
      result.push(1);

      // Add some children, and we should expect these children to be executed first.
      queue(() => {
        result.push(1.1);
      });
      queue(() => {
        result.push(1.2);
      });
    });

    // Alternatively, you can use the provided queue function for appending new calls into the queue
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

  it('should able to execute listeners correctly', () => {
    // This is for updating the result
    const result: string[] = [];
    // Building a queue  list with add on logics.
    const queue = functionQueue({
      complete: () => {
        result.push('done');
      },
    });

    // Adding an apple to the queue list
    queue(() => {
      result.push('apple');
    });

    // Adding a banana to the queue list
    queue(() => {
      result.push('banana');
    });

    // This is to execute everything.
    jest.runAllTimers();
    // And we expect the result to be as such
    expect(result).toStrictEqual(['apple', 'banana', 'done']);

    // Now, you can queue items faster than the script executing them.
    // That is the beauty of this function.
  });
});
