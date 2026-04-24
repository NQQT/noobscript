import { TreeDatabase, TreeDatabaseData } from '../class';

/** Function to get the root node in the tree database */
export const rootFunction = (node: TreeDatabase): TreeDatabase => {
  // Get the Memory Structure
  let memory = node.memory();
  let parent: TreeDatabaseData;
  while (1) {
    // Trailing up the parent
    parent = memory.parent;

    // If Root is Reached. No Further Parent can be found
    if (!parent) break;
    // Continue up the Chain
    memory = parent;
  }

  // Return a New Node with said Memory
  return new TreeDatabase(memory);
};
