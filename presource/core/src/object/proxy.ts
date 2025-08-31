/**
 *
 * This function to proxy an object
 *
 */

import { TRUE } from '../constants/primitive';
import { instanceCreate } from '../instance/create';
import { isInvalid } from '../is/invalid';
import { proxyConstant } from '../proxy/constant';

type Arguments<T> = {
  // Long Hand notations
  value: any;
  key: string;
  // The Object being proxied
  object: T;
  // The method is being called with proxy. Either get / set
  method: string;

  // Shorthand Notations
  o: T;
  v: any;
  k: string;
  m: string;
};

// The Triggers for Object Proxy function
type Triggers<T> = {
  // The Get Trigger
  get?: (args: Arguments<T>) => any;
  // The Set Trigger
  set?: (args: Arguments<T>) => void | boolean;
};

/** To Proxy a Function */
export const objectProxy = <T extends { [key: string]: any }>(item: T, triggers: Triggers<T>) => {
  // Constructing Proxy
  return instanceCreate(proxyConstant(), item, {
    // The Get Proxy Function
    get: (object: T, key: keyof T) => {
      const method = 'get';
      // The Current Value
      const value = object[key];
      const params: any = {
        key,
        value,
        object,
        method,
        // Short hand Notations
        k: key,
        v: value,
        o: object,
        m: method,
      };
      // Getting the Get Callback
      const callback = triggers[method];
      // Return a value, either with proxy or not
      return callback ? callback(params) : object[key];
    },

    // The Set Proxy Function
    set: (object: T, key: keyof T, value: any) => {
      const method = 'set';
      // Constructing the Params
      const params: any = {
        key,
        value,
        object,
        method,

        k: key,
        v: value,
        o: object,
        m: method,
      };
      // Getting the callback function
      const callback = triggers[method];
      // If callback Exists. Return Callback Trigger
      if (callback) {
        const result = callback(params);
        // By default, it will always return true.
        // if for some reason result is valid, return it. (could be false or true?)
        return isInvalid(result) ? TRUE : result;
      }

      // If no callback for set is set then do normally
      object[key] = value;
      // Return True
      return TRUE;
    },
  });
};
