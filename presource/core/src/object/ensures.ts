import { arrayEach } from '../array/each';
import { toString } from '../to/string';
import { typeSwitch } from '../type/switch';

/** Making sure object is an object */
export const objectEnsures = (unknown?: any): { [key: string]: any } =>
  // Looping through typeSwitch format
  typeSwitch(unknown, {
    // If Function is Passed
    function: () => objectEnsures(unknown()),
    // If it is Object. it will return the object as it is
    object: () => unknown,
    // If it is an array, it will reassigned key and value
    array: () => {
      const result: any = {};
      arrayEach(unknown, ({ v, i }) => {
        // Reorganised array into object
        result[i] = v;
      });
      // Returning the Result
      return result;
    },
    // If Undefined. it will return empty object
    undefined: () => ({}),
    // For Everything Else. Return a blank object
    default: () => ({
      // Converting Unknown to String
      [toString(unknown)]: unknown,
    }),
  });
