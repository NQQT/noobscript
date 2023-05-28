import { describe, test, expect } from '@jest/globals';
import { arrayWrapper } from '..';

describe('Remove functionality of array Wrapper', () => {
  const sample = ['apple', 'banana', true, false, 0, 1, 2, null, undefined];
  const $array = arrayWrapper();

  test('Removing every element', () => {
    const example = ['apple', 'banana', 'cat', 'dog', 'elephant'];
    // If not argument is entered. Remove will remove all element. Basically emptying the array
    $array(example).remove();
    expect(example).toStrictEqual([]);
  });

  test('Remove a specific element by index key', () => {
    const example = ['apple', 'banana', 'cat', 'dog', 'elephant', true, false, null, undefined, 1, 2, 3, 4, 5];
    // Remove element 0 from array
    $array(example).remove(0);
    // Apple is removed from the example.
    expect(example).toStrictEqual(['banana', 'cat', 'dog', 'elephant', true, false, null, undefined, 1, 2, 3, 4, 5]);
  });

  test('Remove elements by list of index keys', () => {
    const example = ['apple', 'banana', 'cat', 'dog', 'elephant', true, false, null, undefined, 1, 2, 3, 4, 5];
    $array(example).remove([1, 2, 3]);
    expect(example).toStrictEqual(['apple', 'elephant', true, false, null, undefined, 1, 2, 3, 4, 5]);
  });

  test('Remove element by boolean equality', () => {
    const example1 = [...sample];
    const example2 = [...sample];
    // Removing all value that equivalent to false
    $array(example1).remove(false);
    expect(example1).toStrictEqual(['apple', 'banana', true, 1, 2]);

    // Removing all values that are equivalent to true
    $array(example2).remove(true);
    expect(example2).toStrictEqual([false, 0, null, undefined]);
  });

  test('Remove valid and invalid elements via string query', () => {
    const example1 = [...sample];
    const example2 = [...sample];

    // Remove all the invalid values
    $array(example1).remove('invalid');
    // Null and Undefined are considered to be invalid values
    expect(example1).toStrictEqual(['apple', 'banana', true, false, 0, 1, 2]);

    // Removing all the valid value
    $array(example2).remove('valid');
    // Null and Undefiend are considered to be invalid values
    expect(example2).toStrictEqual([null, undefined]);
  });
});
