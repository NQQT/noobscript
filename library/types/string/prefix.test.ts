import { describe, test, expect } from '@jest/globals';
import { StringPrefixAdd, StringPrefixRemove } from './prefix';

describe('String Prefix Manipulation', () => {
  test('Adding prefix to string', () => {
    // Let's build an example
    const example = 'apple';
    type Example = typeof example;
    // Can only accept value with prefix
    const prefixed: StringPrefixAdd<Example, '@'> = '@apple';
    // This is just for passing the test
    expect(prefixed).toBe('@apple');
  });

  test('Removing prefix from a string', () => {
    // Let's build an example
    const prefixed = '@banana';
    type Prefixed = typeof prefixed;
    // Can only accept value that is not prefixed;
    const example: StringPrefixRemove<Prefixed, '@'> = 'banana';

    // This is just for passing the test
    expect(example).toBe('banana');
  });
});
