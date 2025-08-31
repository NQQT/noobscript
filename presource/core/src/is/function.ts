import { isEqual } from './equal';
import { typeName } from '../type/name';

// The name of the function
const nameFunctionSync = 'function';
const nameFunctionAsync = 'asyncfunction';

/** Checking whether value is a function or not (including async function) */
export const isFunction = (unknown: any): unknown is (...args: any[]) => void =>
  // Reutrn True or False for a Named Function Type
  [nameFunctionSync, nameFunctionAsync].includes(typeName(unknown));

/** Specific check for whether an item is an async function */
export const isFunctionAsync = (unknown: any): unknown is (...args: any[]) => Promise<any> =>
  isEqual(typeName(unknown), nameFunctionAsync);
