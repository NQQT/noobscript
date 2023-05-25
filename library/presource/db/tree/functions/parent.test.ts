import { describe, test, expect } from '@jest/globals';
import { treeDatabase } from '..';

describe('Tree Database - Parent Function', () => {
  test('How to select correct parent, reference and values', () => {
    // Creating a New Node
    const parentNode = treeDatabase('parent');

    // Appending Three Children in total
    const childNode1 = parentNode.append('child');
    const childNode2 = parentNode.append('child');
    const childNode3 = parentNode.append('child');
    const childNode4 = parentNode.append('child');

    // Should be a Total of 3 Children
    expect(parentNode.children().length).toBe(4);
    // Expect reference to be all different.
    expect(childNode1.parent()).not.toBe(parentNode);
    expect(childNode2.parent()).not.toBe(parentNode);
    expect(childNode3.parent()).not.toBe(parentNode);
    expect(childNode4.parent()).not.toBe(parentNode);

    // Expecting all the data to be the same
    expect(childNode1.parent()?.data()).toBe(parentNode.data());
    expect(childNode2.parent()?.data()).toBe(parentNode.data());
    expect(childNode3.parent()?.data()).toBe(parentNode.data());
    expect(childNode4.parent()?.data()).toBe(parentNode.data());
  });
});
