import { arrayEach } from '../../../js/array/each';
import { typeSwitch } from '../../../js/type/switch';
import { TreeDatabase } from '../class';

/** Type and Interface */
type EachCallback = (data: {
  node: TreeDatabase;
  index: number;
  length: number;
  value: any;

  // Shorthand Notation
  i: number;
  l: number;
  v: any;
}) => any;
type Handler = (data: { length: () => number; each: (callback: EachCallback) => any }) => any;
export interface ChildrenResponse {
  (input: Handler): any;
  (input: number): TreeDatabase;
  (input?: any[]): TreeDatabase[];
}

/** The Primary Function */
export const childrenFunction = (node: TreeDatabase, input: any) => {
  // Get the Children from Node
  const { children } = node.memory();

  // Decipher what to do base on the input value
  return typeSwitch(input, {
    // Advance Handler Function
    function: () =>
      // input is a function. Trigger funtion logics
      input({
        // Returning the Length of the Node Children
        length: () => children.length,
        // Looping through each child
        each: (callback: EachCallback) =>
          arrayEach(node.children(), (data) => {
            // Extracting index and length
            const { i, l } = data;
            const childNode = data.v;
            // Get the Data from Node
            const v = childNode.data();
            // Triggering Callback Information
            return callback({ node: childNode, i, l, v, index: i, length: l, value: v });
          }),
      }),
    // If Array is input then use node.descendants format
    array: () => node.descendants(input),
    // If Number is set. It will return the node of that child.
    number: () => {
      // Looping Through the Children Length
      // Appending until desired child count is reached.
      while (children.length <= input) node.append();
      // Extracting the Children Memory
      const memory = children[input];
      // Return a Tree Database
      return treeDatabaseRaw(memory);
    },
    // By Default. Return Children information
    default: () => children.map((memory: any) => treeDatabaseRaw(memory)),
  });
};

/** Create with Raw Memory Data */
export const treeDatabaseRaw = (memory?: any): TreeDatabase => new TreeDatabase(memory);
