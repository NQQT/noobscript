import { objectEach, objectFlatten, objectProxy, typeSwitch } from '@library/presource';

// The type set up for list manager
export type ListManager = <T>(data: T) => ListControl<T>;
type ListControl<T> = {
  (): T;
  (request: string): EntryControl<T[keyof T]>;
  (request: string, update: any): void;
};
type EntryControl<T> = { [Key in keyof T]: EntryControl<T[Key]> };

/** The Primary List Manager Object */
export const listManager: ListManager = (data) => {
  // The Handler Function for List Manager
  const handler = (...args: any[]) => {
    // Extracting the request
    const request = args.shift();
    // Checking what type is being send back
    return typeSwitch(request, {
      // If String Request
      string: ({ v: id }) => {
        typeSwitch(args.shift(), {
          function: ({ O, v: callback }) => {
            // Triggering callback via Object
            O(callback());
          },
          // If Object is applied
          object: ({ v: update }) => {
            // If Object is being applied, then extract the object array for updating
            update = objectFlatten(update);
            objectEach(update, ({ k, v }) => {});
          },
        });
      },
      // By Default. Simply Return the Data
      default: () => data,
    });
  };

  // Constructing a handler function
  const proxy = objectProxy(handler, {
    get: () => {},
    set: () => {},
  });

  // Returning the Proxy Object
  return proxy;
};
