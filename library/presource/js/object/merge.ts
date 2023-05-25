import { arrayEach } from '../array/each';
import { isObject } from '../is/object';
import { typeSwitch } from '../type/switch';
import { objectEach } from './each';

/**
 *
 * Merging Multiple Object into one
 * Note that this nesting combination
 *
 * use objectUpdate for none nesting
 *
 */
export const objectMerge = (...list: { [key: string]: any }[]) => {
  // Standard Result Object
  const result: { [key: string]: any } = {};
  // Scanning Through Array List
  arrayEach(list, (item) => {
    // Scanning through each object
    objectEach(item.v, ({ k, v }) => {
      // Updating the Result Object
      result[k] = typeSwitch(v, {
        // If item is an object. More calculation is needed
        object: () => {
          // Get the Current Value
          const currentValue = result[k];
          // Guard clause, if current value is not an object. return v immediately
          if (!isObject(currentValue)) return v;
          // Return the Combination of the two
          return objectMerge(currentValue, v);
        },
        // If not object. Overwrite
        default: () => v,
      });
    });
  });
  // Returning the FInal result
  return result;
};
