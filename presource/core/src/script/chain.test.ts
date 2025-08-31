import { describe, expect, test } from '@jest/globals';
import { scriptChain } from './chain';

describe('Callback relay', () => {
  test('Basic relay usage', async () => {
    const result: any[] = [];

    // Creating Relay with the following functions
    const relay = scriptChain({
      apple: () => result.push('apple'),
      banana: () => result.push('banana'),
      cat: () => result.push('cat'),
      dog: () => result.push('dog'),
    });

    await relay.apple();
    expect(result).toStrictEqual(['apple']);

    // Triggering another
    await relay.banana();
    expect(result).toStrictEqual(['apple', 'banana']);

    // Triggering multiple
    await relay.cat().dog();
    expect(result).toStrictEqual(['apple', 'banana', 'cat', 'dog']);
  });

  test('Basic relay usage 2 - with arguments', async () => {
    const result: any[] = [];
    const relay = scriptChain({
      add: ({ args }) => {
        const [value] = args;
        result.push(value);
      },
    });

    // Can also pass in arguments
    await relay.add(1).add(2).add(3);
    expect(result).toStrictEqual([1, 2, 3]);
  });
});
