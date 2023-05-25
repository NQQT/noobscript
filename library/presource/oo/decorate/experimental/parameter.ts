import { arrayEach, isValid, objectProxy } from '../../../js';
import { accessParameterDecoratorRegistry } from './access';

type Arguments = {
  value: any;
  index: number;
  instance: any;
};
type Callbacks = {
  [key: string]: (args: Arguments) => any;
};

// This is the structure of a method decorators
type MethodDecorators<T extends Callbacks> = () => (
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => any;

// This is the structure of a parameter decorators
type ParameterDecorators<T extends Callbacks> = {
  [key in keyof T]: (target: object, methodKey: string | symbol, paramIndex: number) => void;
};

type ExperimentalParameterDecorator = <T extends Callbacks>(options: T) => MethodDecorators<T> & ParameterDecorators<T>;

/** Use this function to create a decorator method */
export const experimentalParameterDecorator: ExperimentalParameterDecorator = (options) => {
  /** To Validate all the parameters with decorators */
  const checkParameters = (instance: any, key: string, args: any[]) => {
    // This will always return an array
    const list = accessParameterDecoratorRegistry(instance, key);
    if (!list.length) return;

    return arrayEach(args, ({ index }) => {
      const callbacks = list[index];
      // If There is no callback at all.
      if (!(callbacks && callbacks.length)) return;

      // Scanning Option Key
      return arrayEach(callbacks, ({ value: callback }: any) => {
        // Getting the Callback from the Option
        if (!callback) return;

        // Getting a new value from the callback
        const newValue = callback({
          // For Recursive, the value must be pointed to proper argument
          value: args[index],
          index,
          instance,
        });

        // Updating the argument
        args[index] = newValue || args[index];
      });
    });
  };

  // Constructing the Decorator Function
  const handler = () => {
    // Return a Decorator
    return (target: any, propertyKey: any, descriptor: any) => {
      // Triggering callback to all method
      const originalMethod = descriptor.value;

      // Replacing the Original Value with New Validator Function
      descriptor.value = function (...args: any[]) {
        // Get a value back from validating parameters
        const value = checkParameters(target, propertyKey, args);
        // if value is a valid, then return the value
        if (isValid(value)) return value;
        // Else. Triggering the original method
        return originalMethod.apply(this, args);
      };
    };
  };

  return objectProxy(handler, {
    get: ({ key }) => {
      /** Return a Decorator Factory for Param */
      return (classObject: any, methodKey: string, paramIndex: number) => {
        // Get the list of annotations/decorators associated with that methodKey
        const indexList = accessParameterDecoratorRegistry(classObject, methodKey);
        // Getting the index list for the specific param index
        indexList[paramIndex] = indexList[paramIndex] || [];
        // Adding callback to the list
        indexList[paramIndex].push(options[key]);
      };
    },
  });
};
