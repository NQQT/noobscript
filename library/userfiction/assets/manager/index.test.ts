import { describe, test, expect } from '@jest/globals';
import { dataList } from '@library/presource';
import { listManager } from '.';

describe('List Manager', () => {
  test('Creating an empty list', () => {
    // Simply Create a list via list manager
    const list = listManager({});
    // Expecting the list to be empty
    expect(list()).toMatchObject({});
  });

  test('Creating a preloaded list', () => {
    const source = { a: 'apple', b: 'banana', c: 'cat' };
    const list = listManager(source);

    expect(list()).toMatchObject({ a: 'apple', b: 'banana', c: 'cat' });
  });

  test('Usage with dataList, inventory', () => {
    // Let's create a list
    const list = {};
    // Standard observer function
    const observe = () => {};
    // Creating an item list via data list function
    const itemList = dataList(list, {
      // These are the keys for each item on the list along with its observers
      id: observe,
      value: observe,
      type: observe,
      size: observe,
    });

    // We create an itemManager to manipulate the list easier
    const itemManager = listManager(itemList);

    // Let's adjust an item, call wood for example

    itemManager('wood', () => {});
  });
});
