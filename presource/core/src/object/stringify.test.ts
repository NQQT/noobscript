import { describe, expect, test } from '@jest/globals';
import { objectStringify } from './stringify';

// Testing Object Registry
describe('Object Stringify', () => {
  test('Converting Simple Object to String', () => {
    const value = objectStringify({ a: 1, b: 2, c: 3 });
    expect(value).toEqual('{"a":1,"b":2,"c":3}');
  });
});
