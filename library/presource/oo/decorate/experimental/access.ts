/**
 *
 * Decorator data access
 * Data is stored onto the class object and the instance of the class itself for optimisation and cleanup
 *
 */

import { objectConstant } from '../../../js';

// Function to access decorator data. Instance is required
export const accessDecoratorData = (instance: any) => {
  // The Secret Key to acess decorator data
  const serialKey = '@';

  // Checking whether this instsance has its own property of "@"
  if (!instance.hasOwnProperty(serialKey)) {
    // If Decorator Data does not exists
    objectConstant().defineProperty(instance, serialKey, {
      value: {
        // Storing of infomations
        class: {},
        method: {},
        // Property Data Logic
        property: {
          // Registry is where the decorated functions are stored to be called back
          registry: {},
          // Store is where all the value are stored for get and set functions
          store: {},
        },
        parameter: {
          // Same as property above
          registry: {},
        },
      },
      // Cannot iterate through
      enumerable: false,
      // Cannot be overwritten by any other frame works.
      writable: false,
    });
  }

  // Returning the value
  return instance[serialKey];
};

/** To access the property decorator data */
export const accessPropertyDecoratorData = (instance: any) => {
  const data = accessDecoratorData(instance);
  // Return the data property object
  return data.property;
};

type AccessPropertyDecoratorRegistry = {
  (instance: any): { [key: string]: any[] };
  (instance: any, registryKey: string): any[];
};
export const accessPropertyDecoratorRegistry: AccessPropertyDecoratorRegistry = (instance, registryKey?: any) => {
  // Get the property
  const property = accessPropertyDecoratorData(instance);
  // If Registry Key is not given, return the entire list
  if (!registryKey) return property.registry;

  // If Registry Key is available.
  const registry = property.registry;
  registry[registryKey] = registry[registryKey] || [];
  // Getting the List for the Registry
  return registry[registryKey];
};

// Returning the Store reference within the property decorator
export const accessPropertyDecoratorStore = (instance: any): { [key: string]: any } => {
  const data = accessPropertyDecoratorData(instance);
  return data.store;
};

/** To access the paramater decorator data */
export const accessParameterDecoratorData = (instance: any) => {
  const data = accessDecoratorData(instance);
  return data.parameter;
};

type AccessParameterDecoratorRegistry = {
  (instance: any): { [key: string]: any[] };
  (instance: any, registryKey: string): any[];
};

export const accessParameterDecoratorRegistry: AccessParameterDecoratorRegistry = (instance, registryKey?: any) => {
  const parameter = accessParameterDecoratorData(instance);
  if (!registryKey) return parameter.registry;
  const registry = parameter.registry;
  registry[registryKey] = registry[registryKey] || [];
  return registry[registryKey];
};
