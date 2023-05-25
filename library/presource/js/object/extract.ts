/**
 *
 * For extracting keys or values from an object
 *
 */

import { arrayEach } from '../array/each';
import { UNDEFINED } from '../constants/primitive';
import { isObject } from '../is/object';
import { typeSwitch } from '../type/switch';

// Object Extract Type format
export type ObjectExtract = (object: { [key: string]: any }, extract: any) => any;

/** For extracting anything within an object */
export const objectExtract: ObjectExtract = (object: any, extract: any) => {
  // Depending on what value extract is, the result chould be different
  const result: any = typeSwitch(extract, {
    number: () => {
      // What do number extract exactly?
      // !Not sure what to do with number yet
      return UNDEFINED;
    },
    // If String. Use Drilling path. If only single path, better to use direct access!
    string: ({ v }) => {
      let pointer = object;
      arrayEach(v.split('.'), ({ value }) => {
        pointer = isObject(pointer) ? pointer?.[value] : UNDEFINED;
      });
      // Returning the value. Could be undefeined
      return pointer;
    },
    array: ({ v, S, N, A }) => {
      // if array, accessing multiple instances
      return v.map((value) => {
        return typeSwitch(value, {
          number: () => N(value),
          string: () => S(value),
          array: () => A(value),
          default: () => UNDEFINED,
        });
      });
    },
  });

  return result;
};
