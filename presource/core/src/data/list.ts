/**
 *
 * Data List. Observe changes to a list structure
 *
 * This is especially useful for producing a list of different keys, but same internal structures.
 *
 */

import { isEqual } from '../is/equal';
import { isFunction } from '../is/function';
import { objectAlias } from '../object/alias';
import { objectEach } from '../object/each';
import { objectExtract } from '../object/extract';
import { objectFlatten } from '../object/flatten';
import { objectObserve } from '../object/observe';
import { objectProxy } from '../object/proxy';
import { typeSwitch } from '../type/switch';

type List<T> = { [key: string]: Entry<T> };
type Entry<T> = { [key in keyof T]: Entry<T[key]> };
type Handler<T> = () => T;
type DataList = <T extends {}>(list: { [key: string]: any }, structure: T) => Handler<T> & List<T>;

export const dataList: DataList = (list: any, structure) => {
  // Observing Object Changes
  const observedData = objectObserve(list, ({ method, value, current, path }) => {
    if (isEqual(method, 'set')) {
      // For Triggering callback
      const triggerCallback = ({ key, pointer, value: v }: any) => {
        // Getting the callback (if there is any)
        const callback = objectExtract(structure, pointer);
        const id = path[0];
        if (isFunction(callback)) {
          const params = {
            id,
            // Also send the source list for whatever manipulation needed
            list,
            key,
            previous: current,
            value: v,
          };
          const args = objectAlias(params, {
            k: 'key',
            v: 'value',
            i: 'id',
            l: 'list',
            p: 'previous',
          });
          // Triggering callback
          callback(args);
        }
      };

      // Base on the type of value, process data logic
      typeSwitch(value, {
        // Special case for when value is an object
        object: () => {
          // Flattened it
          const flattened = objectFlatten(value);
          objectEach(flattened, ({ key, v }: any) => {
            const keyArray = path.slice();
            keyArray.push(key);
            const pointer = path.slice(1);
            pointer.push(key);

            triggerCallback({
              key: keyArray.join('.'),
              pointer: pointer.join('.'),
              value: v,
            });
          });
        },

        default: () => {
          triggerCallback({
            key: path.join('.'),
            pointer: path.splice(1).join('.'),
            value,
          });
        },
      });
    }
  });

  const handlerFunction = (request?: any) => {
    return typeSwitch(request, {
      // By Default. Return the Original Source List
      default: () => list,
    });
  };

  /** Proxy Function that Returned */
  const proxy = objectProxy(handlerFunction, {
    // On Get, return the observed data
    get: ({ k }) => observedData[k],
    set: ({ k, v }) => {
      // Updating the Observe Data with value
      observedData[k] = v;
    },
  });

  // Return the proxy object
  return proxy;
};
