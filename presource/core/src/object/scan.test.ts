import { describe, expect, test } from '@jest/globals';
import { isString } from '../is/string';
import { objectScan } from './scan';

describe('Object Scan', () => {
  test('Basic object scanning', () => {
    const example = { a: 'apple', b: 'banana', c: 'cat', d: 'dog' };

    const result: string[] = [];
    objectScan(example, ({ value }) => {
      result.push(value);
    });

    // Automatically Check for Apple, Banana, Cat or Dog
    expect(result).toStrictEqual(['apple', 'banana', 'cat', 'dog']);
  });

  test('Basic value replacement', () => {
    // Replacing value is possible with object scan functionality
    const example = { a: 'apple', b: 'banana', c: 'cat', d: 'dog' };
    objectScan(example, () => 'thing');

    // Replacing all item to things
    expect(example).toStrictEqual({ a: 'thing', b: 'thing', c: 'thing', d: 'thing' });
  });

  test('Deep Scanning', () => {
    const example = { family: { father: { name: 'John' }, mother: { name: 'Jane' } } };
    const result: any = {};

    // Object Flattening Example
    objectScan(example, ({ value, path, key }) => {
      if (isString(value)) {
        // You need to add the current key as well
        path.push(key);
        // Adding to Result
        result[path.join('.')] = value;
      }
    });

    expect(result).toStrictEqual({
      'family.father.name': 'John',
      'family.mother.name': 'Jane',
    });
  });

  test('Deep replacement', () => {
    const example = { family: { father: { name: 'John' }, mother: { name: 'Jane' } } };
    objectScan(example, ({ value }) => {
      if (isString(value)) return 'Unknown';
    });

    // Checking the example new value
    expect(example).toStrictEqual({ family: { father: { name: 'Unknown' }, mother: { name: 'Unknown' } } });
  });
});
