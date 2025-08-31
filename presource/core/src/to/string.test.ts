import { describe, test, expect } from '@jest/globals';
import { toString } from './string';

describe('js/to/toString', () => {
  test('Converting primitives to string', () => {
    expect(toString(1)).toBe('1');
    expect(toString(null)).toBe('null');
    expect(toString(undefined)).toBe('undefined');
    // Empty is not the same as inputing undefined!
    expect(toString()).toBe('');
  });

  test('Converting objects to string', () => {
    // Array Testing
    expect(toString([])).toBe('[]');
    expect(toString([1, 2, 3])).toBe('[1,2,3]');

    // Object Testing
    expect(toString({})).toBe('{}');
    expect(toString({ a: 1, b: 2, c: 3 })).toBe('{"a":1,"b":2,"c":3}');

    // Function Testing using arrow function
    expect(toString(() => {})).toBe('function () { }');
    // Old Function Format
    const test = function () {};
    expect(toString(test)).toBe('function () { }');
  });

  // Advance Usage
  test('Multiple conversion', () => {
    const convert = [1, [], 'hi'];
    expect(toString(...convert)).toStrictEqual(['1', '[]', 'hi']);
  });
});
