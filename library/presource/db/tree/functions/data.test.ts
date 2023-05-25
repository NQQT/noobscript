import { describe, test, expect } from '@jest/globals';
import { treeDatabase } from '..';

describe('TreeDatabase - Data Function Usage', () => {
  test('Setting and retrieving data', () => {
    // Simple Testing. Inserting and Retrieving
    expect(treeDatabase('hello').data()).toBe('hello');
    expect(treeDatabase(1).data()).toBe(1);
    expect(treeDatabase([]).data()).toStrictEqual([]);
    expect(treeDatabase({}).data()).toStrictEqual({});
  });

  test('Setting and retrieving with object', () => {
    // Object is a bit different, as it will access objectRegistry
    const objectNode = treeDatabase({ a: 1, b: 2, c: 3 });

    // Get all the data
    expect(objectNode.data()).toStrictEqual({ a: 1, b: 2, c: 3 });
    // Select Certain data
    expect(objectNode.data());
  });
});
