import { objectEach } from '../object';
import { typeSwitch } from '../type';

/** Designed for Deep Data Cloning */

type Structure = <T>(data: T, cache?: any[]) => T;
export const dataClone: Structure = (data) => {
  // Checking what type is being passed through
  return typeSwitch(data, {
    // If Array. Remapping with Data Clone
    array: ({ v }) => v.map((value) => dataClone(value)),
    // If object. Scan through each and read each object
    object: ({ v }) => {
      const result: any = {};
      objectEach(v, (obj) => {
        // Nested Cloning
        result[obj.k] = dataClone(obj.v);
      });
      // Returning the REsult
      return result;
    },
    // By Default. Return itself.
    default: ({ v }) => v,
  });
};
