/**
 *
 * For observing changes to an object
 * There is an issue of getting object value due to proxifiying
 *
 */

import { TRUE } from '../constants/primitive';
import { isObject, isUndefined } from '../is';
import { objectProxy } from './proxy';
import { objectAlias } from './alias';

type Item = { [key: string]: any };
type Arguments = {
  object: Item;
  key: string;
  // The current value will be passed through
  value: any;
  // The previous value (if set is triggered)
  current: any;
  method: string;
  depth: Memory['depth'];
  path: Memory['path'];

  // Shorthand
  d: Memory['depth'];
  o: Item;
  k: string;
  v: any;
  c: any;
  m: string;
  p: Memory['path'];
};
type Callback = (args: Arguments) => void;
type Memory = { depth: number; path: string[] };

export type ObjectObserve = (item: Item, callback: Callback, memory?: Memory) => Item;

/** Object Observation */
export const objectObserve: ObjectObserve = (item, callback, chain = { depth: 0, path: [] }) => {
  // Return the Proxy Object
  return objectProxy(item, {
    // Get Observer
    get: ({ k, v, m }) => {
      const { depth } = chain;
      const path = [...chain.path];
      // Adding Key into Path
      path.push(k);
      // If v is not defined, setting to an object
      const nested = isUndefined(v) ? {} : v;
      // This is the curent value
      const current = item[k];
      // Updating Object with Nested
      item[k] = nested;
      // Setting the Params
      const params = { key: k, value: v, current, object: item, method: m, depth, path };
      // The Actual Raw Values
      callback(
        objectAlias(params, {
          d: 'depth',
          k: 'key',
          v: 'value',
          c: 'current',
          o: 'object',
          m: 'method',
          p: 'path',
        }),
      );

      // Return another proxied object for recursion
      return isObject(nested) ? objectObserve(nested, callback, { depth: depth + 1, path }) : nested;
    },

    // Set observer
    set: ({ k, v, m }) => {
      // Only Process if Callback exists
      // the passed method
      const { depth } = chain;
      const path = [...chain.path];
      // Adding Key into Path
      path.push(k);
      // The current value
      const current = item[k];
      // Updating value
      item[k] = v;
      // Creating the Params
      const params = {
        key: k,
        value: v,
        current,
        object: item,
        method: m,
        depth,
        path,
      };
      // Calling the Params
      callback(
        objectAlias(params, {
          k: 'key',
          v: 'value',
          c: 'current',
          o: 'object',
          m: 'method',
          d: 'depth',
          p: 'path',
        }),
      );

      // Return the necessary boolean value
      return TRUE;
    },
  });
};
