import { isUndefined } from '../../../js/is/undefined';
import { objectRegistry } from '../../../js/object/registry';
import { typeSwitch } from '../../../js/type/switch';
import { TreeDatabase } from '../class';

// The Data Function to Access Data stored within the node
export const dataFunction = (node: TreeDatabase, input?: any) => {
  // Creating a Pointer Reference
  const pointer = 'data';
  // Get the Data Payload
  const data = node.memory(pointer);
  // CHecking Whether Input is Undefined or not
  return isUndefined(input)
    ? data
    : typeSwitch(data, {
        // If Data is Original an Object
        object: () => {
          // Wrap Around Registry
          const registry = objectRegistry(data);
          // Return what Object Registry would do
          return registry(input);
        },
        // By Default. Overwrite
        default: () => {
          // Replace Data
          node.memory(pointer, input);
        },
      });
};
