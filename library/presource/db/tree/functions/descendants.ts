import { arrayEach } from '../../../js/array/each';
import { isArray } from '../../../js/is/array';
import { typeSwitch } from '../../../js/type/switch';
import { TreeDatabase } from '../class';

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
type Handler = (args: { length: () => number; each: (callback: EachCallback) => any }) => any;

export interface DescendantsFunction {
  (input: Handler): any;
  // Return the New Tree Handler
  (input?: any[]): TreeDatabase[];
}

export const descendantsFunction = (node: TreeDatabase, input?: any) => {
  // Get all the Descendants
  const descendants = getListOfAllDescendants(node);

  // Return according to the response
  return typeSwitch(input, {
    // Smart handler function
    function: () =>
      input({
        // Return the Calculated Descendant Length
        length: () => descendants.length,
        // Each Loop Function
        each: (callback: EachCallback) =>
          // Using Smart Array Each Callback for possible return
          arrayEach(descendants, (data) => {
            // Extracting index and length
            const { i, l } = data;
            // Store the actual data as value, not the structure of the tree database
            const childNode = data.v;
            const v = childNode.data();
            return callback({ node: childNode, i, l, v, index: i, length: l, value: v });
          }),
      }),
    // If Array then Loading Descendants
    array: () => input.map((value: any) => (isArray(value) ? node.append().descendants(value) : node.append(value))),
    // Default Value. Return the Descendants
    default: () => descendants,
  });
};

const getListOfAllDescendants = (root: TreeDatabase) => {
  // The List that will be returned
  const list: TreeDatabase[] = [];

  // This Funtion Recurse Upon itself. If there too much depth, it might be an issue
  const recursiveFunction = (pointer: TreeDatabase) => {
    // Scanning Pointer Chidlren
    pointer.children(({ length, each }) => {
      // Checking if Length is Valid or not
      if (length()) {
        // Using the Each Function via Handler
        each(({ node }) => {
          // Adding the Node to List
          list.push(node);
          // Recursive itself
          recursiveFunction(node);
        });
      }
    });
  };

  recursiveFunction(root);
  // Returning the list
  return list;
};
