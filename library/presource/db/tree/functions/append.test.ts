import { describe, test, expect } from '@jest/globals';
import { treeDatabase } from '..';

describe('Tree Database - Append Function', () => {
  test('Appending Data', () => {
    // Creating a New Node
    const node = treeDatabase();

    // Appending Three Children in total
    node.append(1);
    node.append(2);
    node.append(3);

    // Should be a Total of 3 Children
    expect(node.children().length).toBe(3);
  });
});
