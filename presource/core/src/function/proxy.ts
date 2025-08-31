/** A way to proxify a function */

import { FALSE, NULL, TRUE } from '../constants/primitive';
import { instanceCreate } from '../instance/create';
import { isArray } from '../is/array';
import { proxyConstant } from '../proxy/constant';

// The callback arguments
type Arguments = {
  // The method that this function was called
  method: 'call' | 'get' | 'set';
  // The key that is currently called
  key: null | string;
  // Any parameter has been called
  params: any[];
};

// The callback for proxy function
type Callback = (args: Arguments) => any;

// Constructing a Function Proxy
export const functionProxy = (callback: Callback) => {
  let currentKey: null | string = NULL;

  let throughGetQuery = FALSE;
  // Constructing the Stand in proxy function
  const proxyFunction = (...params: any[]) => {
    // Updating Key
    const key = throughGetQuery ? currentKey : NULL;
    // Return the Callback
    const result = callback({ key, method: 'call', params });
    // Reset the switch
    throughGetQuery = FALSE;
    // Returning the Result From Callback
    return result;
  };

  // When Set Event is Triggered
  const setFunction = (target: any, key: string, value: any) =>
    callback({
      key,
      method: 'set',
      params: isArray(value) ? value : [value],
    });

  // When Get Event is Triggered
  const getFunction = (target: any, key: string) => {
    // Updating the current key
    currentKey = key;
    // Remember that it went through get Query
    throughGetQuery = TRUE;
    // Updating Previous key
    return callback({ key, method: 'get', params: [] }) || target;
  };

  // Finally Return the Proxy Function
  return instanceCreate(proxyConstant(), proxyFunction, {
    set: setFunction,
    get: getFunction,
  });
};
