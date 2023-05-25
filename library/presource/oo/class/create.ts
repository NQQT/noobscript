import { isUndefined } from '../../js/is/undefined';
import { objectEach } from '../../js/object/each';

/**
 *
 * Why is this useful?
 * It is to reduce boiler plate design for Object oriented Programming
 *
 */

/** Creation of the Class Create */
type ClassCreate = <T extends {}>(properties: T) => new (...args: any[]) => T;

/** Creating Class from an Object Format */
export const classCreate: ClassCreate = (properties) => {
  // Building a class object
  const result: any = class {
    // Creating a Constructor
    constructor(...args: any[]) {
      // Scanning through the argument
      objectEach(properties, ({ k, v, i }) => {
        // Checking the user inputted value
        const value = args[i];
        // Updating itself
        (this as any)[k] = isUndefined(value) ? v : value;
      });
    }
  };

  // Returning the Class
  return result;
};
