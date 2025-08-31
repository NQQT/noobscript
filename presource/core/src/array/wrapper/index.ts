import { isInvalid } from '../../is/invalid';
import { objectProxy } from '../../object/proxy';
import { countFunction } from './methods/count';
import { eachFunction } from './methods/each';
import { getFunction } from './methods/get';
import { isFunction } from './methods/is';
import { keysFunction } from './methods/keys';
import { removeFunction } from './methods/remove';
import { retainFunction } from './methods/retain';
import { selectFunction } from './methods/select';

/**
 *
 * Wrapper function are use for complex calculation
 * By itself, they are pretty slow compare to other configure
 * Use other configure if possible.
 *
 */

export type Params = {
  wrapper: WrapperFunction<{}>;
  element: any[];
  config: { filter: ((data: any, params: Params) => boolean)[] };
  instance: Returned<{}>;

  w: WrapperFunction<{}>;
  e: any[];
  c: { [key: string]: any };
  i: Returned<{}>;
};

type ExtendList<T extends ExtendList<T>> = { [key: string]: ExtendFunction<T> };
type ExtendFunction<T extends ExtendList<T>> = (params: Params & { args: any[] }) => any;
type WrapperFunction<T extends ExtendList<T>> = (element: any[], config?: Params['config']) => Returned<T>;
type Returned<T extends ExtendList<T>> = {
  // Generic. Following pattern of T with values
  [key in keyof T]: {
    (): Returned<T>;
    (...args: any[]): any;
  };
} & {
  (): any;
  count: (request?: Parameters<typeof countFunction>[1]) => number;
  get: (request?: Parameters<typeof getFunction>[1]) => any[];
  keys: (request?: Parameters<typeof keysFunction>[1]) => number[];
  is: (check?: Parameters<typeof isFunction>[1]) => boolean;

  /** Chaining Possible */
  each: (callback: Parameters<typeof eachFunction>[1]) => Returned<T>;
  remove: (request?: Parameters<typeof removeFunction>[1]) => Returned<T>;
  select: (request: Parameters<typeof selectFunction>[1]) => Returned<T>;
  retain: (request: Parameters<typeof retainFunction>[1]) => Returned<T>;
};

type Structure = <T extends ExtendList<T>>(methods?: T) => WrapperFunction<T>;

/** A Wrapper around an array, extending functionality */
export const arrayWrapper: Structure = (callbacks: any = {}) => {
  /** Returning the Wrapper Function */
  const wrapper = (element: any[], config = {}) => {
    // The Primary Handler Function for Advance Usage
    const handler = () => {
      // Advance usage is not defined yet
      return null;
    };

    // The Default Proxy Function
    const instance = objectProxy(handler, {
      get: ({ k }) => {
        // Setting up the Parameter that being passed down to other functions
        const params: any = {
          wrapper,
          element,
          config,
          instance,
        };

        const available: any = {
          /** Value functions */
          // Get Functionality
          get: (request: any) => getFunction(params, request),
          // Getting the keys from array.
          keys: (request: any) => keysFunction(params, request),
          is: (request: any) => isFunction(params, request),
          count: (request: any) => countFunction(params, request),
          /** Chaining Functions */
          select: (request: any) => selectFunction(params, request),
          // Each Function
          each: (callback: any) => eachFunction(params, callback),
          // Remove item from array
          remove: (request: any) => removeFunction(params, request),
          // Retain an item from array. This is reverse of remove
          retain: (callback: any) => retainFunction(params, callback),
        };

        const extendedCallback = callbacks[k];
        if (extendedCallback) {
          // Return a Wrapper function for extended callback
          return (...args: any[]) => {
            const value = extendedCallback({ ...params, args });
            if (!isInvalid(value)) return value;
            return instance;
          };
        }

        // Check callbacks before available listing
        return available[k];
      },
    });

    // Returning the proxy function
    return instance;
  };
  // Returning the Wrapper function
  return wrapper;
};
