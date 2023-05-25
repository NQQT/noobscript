import { arrayEach, isUndefined, objectConstant, objectProxy, stringSwitch } from '../../../js';
import { accessPropertyDecoratorRegistry, accessPropertyDecoratorStore } from './access';

type Arguments = {
  // The Property Key
  key: string | symbol;
  // Method Type
  method: {
    // The Method to access this decorator
    type: 'set' | 'get';
    // Triggering base on Set method
    set: (trigger: any) => any;
    // Triggering base on Get Method
    get: (trigger: any) => any;
  };
  // The Request Parameter if it exists
  request: any;
  // Value is defined as an object list
  value: {
    previous: any;
    current: any;
  };
  // Instance of the Object
  instance: any;
};

type Callbacks = {
  [key: string]: (args: Arguments) => any;
};

type PropertyDecorator = (target: object, propertyKey: string) => any;

type PropertyDecorators<T extends Callbacks> = {
  [key: string]: {
    // Default. Return
    (): PropertyDecorator;
    // tslint:disable-next-line:unified-signatures
    (request: any): PropertyDecorator;
    (target: object, propertyKey: string): any;
  };
};
type ExperimentalPropertyDecorator = <T extends Callbacks>(options: T) => PropertyDecorators<T>;

export const experimentalPropertyDecorator: ExperimentalPropertyDecorator = (options) => {
  // The Primary Handler Function
  const handler = () => {
    // Additional Functionality will be added here
  };

  return objectProxy(handler, {
    get: ({ key }) => {
      // The request parameter
      let request: any = null;
      /** Return a Decorator Factory for Param */
      const propertyDecorator = (classObject: any, propertyKey: string) => {
        // Getting the current descriptor (if any)
        const descriptor = objectConstant().getOwnPropertyDescriptor(classObject, propertyKey);

        // Note that registry is stored on the class object itself.
        // This is because instance doesn't exist yet!
        const registry = accessPropertyDecoratorRegistry(classObject, propertyKey);

        // Pushing this particular callback into the registry list
        registry.push(({ value, method, instance }: any) => {
          // Getting the callback from options
          const callback = options[key];
          // Triggering callback
          return callback({ method, request, key: propertyKey, value, instance });
        });

        // If there is already one. Return.
        if (descriptor) return;

        /** Defining the property */
        objectConstant().defineProperty(classObject, propertyKey, {
          // Proxying the property key, for Getting the value of the property
          get() {
            const instance = this;
            // Getting the value out of the store of this particular instance
            let value: any = accessPropertyDecoratorStore(this)[propertyKey];
            // Reducing the get funntionality
            arrayEach(registry, ({ value: callback }: any) => {
              // Getting back the result
              const result = callback({
                method: {
                  type: 'get',
                },
                request,
                value: {
                  previous: value,
                  current: value,
                },
                instance,
              });
              // If result is not undefeined, result is stored to the value
              if (!isUndefined(result)) {
                value = result;
              }
            });
            // Finally Returning the value
            return value;
          },

          // For Setting the value of the property
          set(value: any) {
            // Save this to instance.
            const instance = this;
            // Reducing the get funntionality
            arrayEach(registry, ({ value: callback }: any) => {
              // Getting back the result
              const result = callback({
                method: {
                  type: 'set',
                },
                request,
                value: {
                  // Sending in the previous decorator value
                  previous: accessPropertyDecoratorStore(instance)[propertyKey],
                  // The Current Value
                  current: value,
                },
                instance,
              });

              // If result returned is not undefined, then overwrite the current value
              if (!isUndefined(result)) {
                // For Setting a new value into store
                accessPropertyDecoratorStore(instance)[propertyKey] = value;
                // Updating the value
                value = result;
              }
            });
            // Make sure to set the value
            accessPropertyDecoratorStore(instance)[propertyKey] = value;
          },
        });
      };

      // Smart Interceptor
      return (...args: any[]) => {
        // Base on the argument length, several options will happen
        return stringSwitch(args.length, {
          // If there is no argument being passed, it will simply return the decorator
          0: () => propertyDecorator,
          1: () => {
            // Setting the request to argument
            request = args[0];
            return propertyDecorator;
          },
          default: () => propertyDecorator(...(args as [any, string])),
        });
      };
    },
  });
};
