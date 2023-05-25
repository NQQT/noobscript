import { treeDatabase } from '..';
import { TreeDatabase } from '../class';

// Appending Function
export const appendFunction = (node: TreeDatabase, data?: any) => {
  // Set Self as Parent Node
  const parentNodeData = node.memory();
  const { children } = parentNodeData;

  // Create a Child Node
  const childNode = treeDatabase(data);
  // Setting the parent Node
  childNode.memory('parent', parentNodeData);

  // Setting the Children Array with Child Node memory
  children.push(childNode.memory());

  // Return the childNode
  return childNode;
};
