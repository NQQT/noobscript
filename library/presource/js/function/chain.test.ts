import { describe, expect, test } from '@jest/globals';
import { functionChain } from './chain';

describe('Testing Chain Function - the ability to endlessly chain function calls', () => {
  test('Basic chaining triggers', () => {
    // The list of the callers
    let chainRecord: any = [];
    let paramsRecord: any = [];

    // For Reseting the Chain Records
    const reset = () => {
      chainRecord = [];
      paramsRecord = [];
    };

    // Creating a Chain Function
    const chain = functionChain(({ key, params }) => {
      // If Key is Valid. Add Key to caller List
      if (key) chainRecord.push(key);
      // Adding to Value List
      params.forEach((v) => paramsRecord.push(v));
    });

    // Chain Hi
    chain('hi');

    // Expecting Value List to
    expect(chainRecord).toStrictEqual([]);
    expect(paramsRecord).toStrictEqual(['hi']);

    // Triggering
    reset();
    chain.hello();
    expect(chainRecord).toStrictEqual(['hello']);
    expect(paramsRecord).toStrictEqual([]);

    reset();
    chain.hello.new('chain');
    expect(chainRecord).toStrictEqual(['hello', 'new']);
    expect(paramsRecord).toStrictEqual(['chain']);

    reset();
    chain.hello('world').new('chain');
    expect(chainRecord).toStrictEqual(['hello', 'new']);
    expect(paramsRecord).toStrictEqual(['world', 'chain']);

    reset();
    chain.is.very.very.awesome();
    expect(chainRecord).toStrictEqual(['is', 'very', 'very', 'awesome']);

    reset();
    chain().is().very().very().awesome();

    expect(chainRecord).toStrictEqual(['is', 'very', 'very', 'awesome']);
    chain().is().great();
    expect(chainRecord).toStrictEqual(['is', 'very', 'very', 'awesome', 'is', 'great']);

    reset();
    chain(1).chain(2).chain(3).chain(4);
    expect(chainRecord).toStrictEqual(['chain', 'chain', 'chain']);
    expect(paramsRecord).toStrictEqual([1, 2, 3, 4]);
  });
});
