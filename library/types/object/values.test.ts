import { describe, test, expect } from '@jest/globals';
import { ObjectValues } from './values';

describe('Object Values Type', () => {
  test('Extracting values type', () => {
    // Constructing example
    const example = { number: 10, string: 'apple', function: () => true, array: ['cat', 'dog'] };
    type Example = typeof example;
    // Allowable Values would be number, string, ()=>boolean and array
    let key: ObjectValues<Example> = 15;
    key = 'hello';
    key = () => true;
    key = ['a', 'b', 'c'];

    // Restricted
    let anotherKey: ObjectValues<Example, Function> = () => true;
    // Can only be function
    expect(anotherKey).toBeInstanceOf(Function);
  });
});
