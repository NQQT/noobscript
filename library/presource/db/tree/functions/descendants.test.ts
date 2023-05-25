import { describe, test, expect } from '@jest/globals';
import { treeDatabase } from '..';

describe('TreeDatabase - Descendants Functionality', () => {
  test('Basic Descendants Functions', () => {
    const database = treeDatabase();

    // There are No Descendants at all
    expect(database.descendants()).toHaveLength(0);
    database.descendants([1, 2, 3]);
    // Just Added 3 Descendants
    expect(database.descendants()).toHaveLength(3);

    // Adding 3 Children and 2 Descendants
    // Issue with 3rd child doesn't have a value...
    database.descendants([4, 5, [6.1, 6.2]]);
    expect(database.descendants()).toHaveLength(8);
  });

  test('Using Handler Functions', () => {
    // Recreating Database
    const database = treeDatabase();
    database.descendants([1, 2, 3, 4, 5, 6, 7, 8]);
    const result: number[] = [];
    // Adding up the descendants
    database.descendants(({ each }) => {
      each(({ v }) => {
        result.push(v);
      });
    });
    // Expecting the result to be the same
    expect(result).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
