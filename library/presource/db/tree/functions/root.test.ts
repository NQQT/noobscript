import { describe, test, expect } from '@jest/globals';
import { treeDatabase } from '..';

describe('Tree Database - Parent Function', () => {
  test('Root should all be the same', () => {
    // Let Define Root with a value called root
    const rootNode = treeDatabase('root');

    const child1 = rootNode.append('child1');
    const child2 = rootNode.append('child2');

    const grandChild1 = child1.append('grandchild1');
    const grandChild2 = child2.append('grandchild2');

    // No matter where. Root function will get the root
    expect(grandChild1.root().data()).toBe(rootNode.data());
    expect(grandChild2.root().data()).toBe(rootNode.data());
    // This should not be the same, as new root instance will be created
    expect(grandChild1.root()).not.toBe(rootNode);
    expect(grandChild2.root()).not.toBe(rootNode);

    // Likewise. parent and child root means same thing.
    expect(child1.root().data()).toBe(rootNode.data());
    expect(child2.root().data()).toBe(rootNode.data());
  });
});
