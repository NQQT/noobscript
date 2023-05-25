import { typeSwitch } from '../type/switch';
import { isUndefined } from '../is/undefined';
import { objectUpdate } from './update';
import { objectCreate } from './create';
import { objectEach } from './each';

// The Key Object.
type Key = string | { [key: string]: any };

// Callback
type Argument = {
  key: string | number;
  value: any;
  k: string | number;
  v: any;
  index: number;
  i: number;
  object: { [key: string]: any };
  o: { [key: string]: any };
};

type EachCallback = (data: Argument) => any;

type HandlerFunction = (handler: { each: (callback: EachCallback) => any }) => any;

/** For storing data into a registry. Access via accessor function */
export const objectRegistry = (registry: { [key: string]: any } = {}) => {
  // Constructing the Accessor Function
  const accessor = (key?: Key | HandlerFunction, value?: any) =>
    // Matching typeof key against certain values
    typeSwitch(key, {
      // Handler Function
      function: ({ v }) =>
        // Triggering Self
        v({
          // Each Function. Looping back with object Each
          each: (callback: EachCallback) => objectEach(registry, (data) => callback(data)),
        }),
      // If Array. Return Proper Values
      array: ({ v }) => objectCreate(v, ({ v: k }) => registry[k]),
      // if it is number. return as it is
      number: (data) => data.string(data.v),
      // if key is string
      string: ({ v }) => {
        // If value is undefined. Return the Registry with Key
        if (isUndefined(value)) return registry[v];
        // Updating the Registry
        registry[v] = value;
        // returning the accessor Function
        return accessor;
      },
      // If Object. update the Registry
      object: ({ v }) => objectUpdate(registry, v),
      // For Everything Else. Return Registry
      default: () => registry,
    });
  // returning the accessor function to consume
  return accessor;
};
