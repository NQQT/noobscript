import { describe, test, expect } from '@jest/globals';
import { StringSuffixAdd, StringSuffixRemove } from './suffix';

describe('String Suffix Manipulation', () => {
  test('Adding suffix to string', () => {
    // Let's build an example
    const example = 'apple';
    type Example = typeof example;
    // Can only accept value with suffixed
    const suffixed: StringSuffixAdd<Example, '@'> = 'apple@';
    // This is just for passing the test
    expect(suffixed).toBe('apple@');
  });

  test('Removing suffix from a string', () => {
    // Let's build an example
    const suffixed = 'banana@';
    type Suffixed = typeof suffixed;
    // Can only accept value that is not prefixed;
    const example: StringSuffixRemove<Suffixed, '@'> = 'banana';

    // This is just for passing the test
    expect(example).toBe('banana');
  });
});
