import { describe, test, expect } from '@jest/globals';
import { ObjectPrefixKeys } from './prefix';

describe('Adding Prefix to Object Key Arrays', () => {
  test('Basic check', () => {
    // Constructing an Example
    const example = { a: 'apple', b: 'banana', c: 'cat', d: 'dog' };
    type Example = typeof example;

    // Adding an underscroll prefix to the new object
    const prefixed: ObjectPrefixKeys<Example, '_'> = {
      _a: '',
      _b: '',
      _c: '',
      _d: '',
    };

    // Just for Testing
    expect(prefixed).toMatchObject({
      _a: '',
      _b: '',
      _c: '',
      _d: '',
    });
  });
});
