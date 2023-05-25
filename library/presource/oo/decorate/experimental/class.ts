/**
 *
 * For Creating a Decorator Class
 *
 */

import { objectConstant, objectKeys, stringSwitch, typeSwitch } from '../../../js';

type Arguments = {
  constructor: any;
  request: any[];
  keys: () => string[];
  /** Meta Data Access */
  define: (properties: {
    [key: string]: { value: any; writable?: boolean; enumerable?: boolean; configurable?: boolean };
  }) => any;
  meta: (query: string) => any;
};
type Callback = (args: Arguments) => any;
type ClassDecorator = (constructor: object) => any;
type Handler = {
  (...args: any[]): any;
  (): ClassDecorator;
};
type ExperimentalClassDecorator = (callback: Callback) => Handler;

/** Use this function to create a flexiable decorator class */
export const experimentalClassDecorator: ExperimentalClassDecorator = (callback) => {
  // The Handler Function
  const handler = (...request: any[]) => {
    return (constructor: any) => {
      const result = callback({
        constructor,
        request,
        keys: () => {
          const example = new (constructor as any)();
          return objectKeys(example);
        },
        // For Defining new Properties
        define: (properties) => {
          // For Easily defining new properties
          objectConstant().defineProperties(constructor.prototype, properties);
        },
        // Meta Data Access
        meta: (query) => {},
      });
      // Result should be another constructor
      return result || constructor;
    };
  };

  /** Smart Class Decorator Function */
  return (...args: any) => {
    // Checking the args length
    return stringSwitch(args.length, {
      // If Argument is of length 1
      1: () =>
        // Checking the type
        typeSwitch(args[0], {
          string: () => handler(...args),
          // The Class Object
          default: () => handler().apply(this, args),
        }),
      default: () => handler(...args),
    } as any);
  };
};
