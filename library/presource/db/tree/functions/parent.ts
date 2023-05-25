import { NULL } from '../../../js/constants/primitive';
import { TreeDatabase } from '../class';

// Return the Node of the Parent
export const parentFunction = (node: TreeDatabase) => {
  const { parent } = node.memory();
  // If Parent Exists. Return parents. Else return null
  return parent ? new TreeDatabase(parent) : NULL;
};
