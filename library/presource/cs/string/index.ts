import { treeDatabase } from '../../db/tree';
import { TreeDatabase } from '../../db/tree/class';
import { arrayEach } from '../../js/array/each';
import { SPACE } from '../../js/constants/string';
import { isObject } from '../../js/is/object';
import { objectEach } from '../../js/object/each';
import { objectMerge } from '../../js/object/merge';
import { objectUpdate } from '../../js/object/update';
import { typeSwitch } from '../../js/type/switch';
import { MapperArguments, MapperCallbackList, Structure } from './assets/interface';
import { objectKeys } from '../../js';

/**
 *
 * For converting a string to an object
 *
 */

export const stringStyled: Structure = (input, resolvers) => {
  // Constructing each item into proper style
  const styles = input.split(SPACE).map((value) => stringStyledEach(value, resolvers));
  // Returning the Result
  return objectMerge(...styles);
};

const stringStyledEach: Structure = (input, resolvers = {}) => {
  // Splitting Array
  const list = input.split('.');
  // Creating a Tree Database
  const root = treeDatabase({});
  // Setting the Pointers
  let pointers = [root];

  // Scanning Through the Array
  arrayEach(list, ({ value }) => {
    // Resolving Style
    const style = resolveStyle(value, resolvers);

    // Need to check through each pointers
    arrayEach(pointers, ({ v: node }) => {
      // Appending the Style to Each pointer
      node.append({ ...style });
    });

    // Resolving, and grabbing new pointers
    pointers = resolvePointers(pointers);
  });

  // Return an Empty Object
  return getStyledObjectRecursive(root);
};

// Beware of infinite loop?
const getStyledObjectRecursive = (root: TreeDatabase) => {
  // Getting the Result
  const result = root.data();

  // Function to extract data from the node recursively
  root.children(({ each }) => {
    // Scanning through each child node
    each(({ node }) => {
      // Get the Nested Data structure
      const data = getStyledObjectRecursive(node);

      if (!objectKeys(result).length) {
        // Loading the data into the result itself
        objectUpdate(result, data);
      } else {
        // Scanning Through the result
        objectEach(result, ({ key, value }) => {
          if (isObject(value)) {
            objectUpdate(value, data);
          } else {
            result[key] = data;
          }
        });
      }
    });
  });

  return result;
};

// For Getting new pointers from the current pointers
const resolvePointers = (pointers: TreeDatabase[]) => {
  let result: TreeDatabase[] = [];

  arrayEach(pointers, ({ value }) => {
    // Getting the Children List
    const children = value.children();
    result = result.concat(children);
  });
  // Returning the Result
  return result;
};

// Passing the Resolved Branches
const resolveStyle = (input: string, resolvers: MapperCallbackList) => {
  const output: any = {};
  // Splitting Based on Requests
  const value: any = input.split('-');

  // Get the Callers
  const callers: string[] = value.shift().split('/');

  // Scanning through the callers data
  arrayEach(callers, ({ v: key }) => {
    const resolveFunction = resolvers[key];
    if (resolveFunction) {
      // Setting up the required params
      const params: MapperArguments = {
        output,
        key,
        value,
        // Shorthand Notation
        v: value,
        k: key,
        o: output,
      };

      // If resolve function exists
      typeSwitch(resolveFunction(params, resolvers), {
        // Only handle for object here
        object: (data) => {
          // Continously UPdating the Style object
          objectUpdate(output, data.v);
        },
      });
    } else {
      // If resolver Function doesn't exists
      // By default, it will add to list
      objectUpdate(output, {
        [key]: {},
      });
    }
  });

  // Returning the Output Style
  return output;
};
