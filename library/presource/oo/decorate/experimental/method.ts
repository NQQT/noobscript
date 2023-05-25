import { isUndefined, stringSwitch } from '../../../js';

type Arguments = {
  key: string;
  object: object;
  params: any[];
  request: any[];
  evaluate: () => any;
};
type Callback = (args: Arguments) => any;

type MethodDecorator = (target: object, propertyKey: string, descriptor: PropertyDescriptor) => any;
type Handler = {
  (...args: any[]): any;
  (): MethodDecorator;
};
type ExperimentalMethodDecorator = (callback: Callback) => Handler;

/** For Decorating a Class Method */
export const experimentalMethodDecorator: ExperimentalMethodDecorator = (callback): any => {
  // Method Decorator
  const handler = (...request: any[]) => {
    return (classObject: any, propertyKey: string, descriptor: PropertyDescriptor) => {
      // Getting the Original Method
      const originalMethod = descriptor.value;
      descriptor.value = (...args: any[]) => {
        // Triggering the callback to get the value
        const value = callback({
          // The Property Key
          key: propertyKey,
          // This is the class level object
          // Can be used to manipulate the class further
          object: classObject,
          // Any argument being passed into the function itself
          params: args,
          request,
          // Evaluating the original method
          evaluate: (...overwrite: any[]) => {
            // Evaluating the Original method with new arguments or old arguments
            return originalMethod.apply(this, overwrite.length ? overwrite : args);
          },
        });

        // If callback value is valid, return the value
        if (!isUndefined(value)) return value;

        // If value is not being intercepted, then return the original value
        return originalMethod.apply(this, args);
      };
    };
  };

  return (...args: any) => {
    // Base on the argument length, several options will happen
    return stringSwitch(args.length, {
      // If there is no argument being passed, it will simply return the decorator
      0: () => handler(),
      // If three argument is passed, it assumes to treat this function like a handler
      3: () => handler().apply(this, args),
      default: () => handler(...args),
    });
  };
};
