import { isObject } from '../is/object';
import { objectScan } from './scan';

type Arguments = {
  key: string;
  value: any;
  object: { [key: string]: any };
  index: number;
  length: number;
  path: string[];

  // Shorthand Notations
  l: number;
  o: { [key: string]: any };
  k: string;
  v: any;
  i: number;
  p: string[];
};

type Callback = {
  key?: (args: Arguments) => string;
  value?: (args: Arguments) => string;
};
type Structure = (object: { [key: string]: any }, callback?: Callback) => { [key: string]: any };

/** For flattening an object, making everything on one row */
export const objectFlatten: Structure = (object, callback) => {
  const result: { [key: string]: any } = {};
  // Using Object Scan function
  objectScan(object, (data) => {
    // Extracting the Data
    const { v, k, p } = data;
    // Checking Whether v is an object or not
    if (!isObject(v)) {
      // v must not be an object
      // Adding the Current Key to the Path
      if (k) {
        // Only if k is a valid. Empty string are not counted
        p.push(k);
      }

      // Converting Key and Value
      const newKey = callback?.key?.(data) || p.join('.');
      const newValue = callback?.value?.(v) || v;
      // Updating the Result with Path
      result[newKey] = newValue;
    }
  });

  // Returning the Final Result
  return result;
};
