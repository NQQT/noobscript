import { describe, expect, test } from '@jest/globals';
import { treeDatabase } from '..';

describe('TreeDatabase - Children Functionality', () => {
  test('Basic of Selecting children', () => {
    // Creating a Database
    const database = treeDatabase('parent');
    // Appending some children
    database.append('child1');
    database.append('child2');
    database.append('child3');
    database.append('child4');
    // There are a total of 4 childern
    expect(database.children().length).toBe(4);
    // Selecting Child at Index 3
    expect(database.children(3).data()).toBe('child4');

    // Child at 6th index doesn't exist. Hence Undefined
    expect(database.children(5).data()).toBeUndefined();
    // The Length has been Changed
    expect(database.children().length).toBe(6);
  });

  test('Insert children with array', () => {
    // Creating a Database
    const database = treeDatabase('parent');
    // Appending some children
    expect(database.children([1, 2, 3])).toHaveLength(3);
    expect(database.children().length).toBe(3);
  });

  test('Using Handler Functionality', () => {
    // Creating a Database
    const database = treeDatabase('parent');
    // Appending some children
    database.append('child1');
    database.append('child2');
    database.append('child3');
    database.append('child4');
    // Can Also Access Length via Handler
    expect(database.children(({ length }) => length())).toBe(4);

    // Advance Node Selection
    expect(
      database.children(({ each }) => {
        // Returning the First Node data
        return each(({ node }) => {
          return node.data();
        });
      }),
    ).toBe('child1');

    // Can also return all sort of information
    expect(
      database.children(({ each }) => {
        // Returning the First Node data
        return each(({ value, index, length }) => {
          return { value, index, length };
        });
      }),
    ).toStrictEqual({ index: 0, length: 4, value: 'child1' });
  });
});
