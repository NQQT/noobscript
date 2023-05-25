import { describe, test, expect } from '@jest/globals';
import { ObjectKeys } from './keys';

describe('Object Keys Type', () => {
  test('Extracting keys type', () => {
    // Constructing example
    const example = { number: 10, string: 'apple', function: () => true, array: ['cat', 'dog'] };
    type Example = typeof example;
    // Allowable Values
    let key: ObjectKeys<Example> = 'number';
    key = 'string';
    key = 'function';
    key = 'array';

    // Restricted
    let anotherKey: ObjectKeys<Example, Function> = 'function';
    // Can only be function
    expect(anotherKey).toBe('function');
  });
});
