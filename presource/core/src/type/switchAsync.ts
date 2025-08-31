/**
 *
 * Type Switch, but Async Format
 *
 */

import { isUndefined } from '../is/undefined';
import { isStringEmpty } from '../is/string';
import { typeName } from './name';
import { objectEach } from '../object/each';
import { objectHasKey } from '../object/has';
import { stringUpperCase } from '../string/upper';
import { isFunction } from '../is/function';

export type TypeSwitchAsync = <T>(unknown: T, cases: Cases<T>) => Promise<any>;

type Cases<T> = {
  // Default Case. Trigger when Nothing Else Matches
  default?: (args: { v: T; value: T } & Nested) => any;
  undefined?: (args: Nested) => any;
  null?: (args: Nested) => any;
  string?: (args: { v: string; value: string } & Nested) => any;
  number?: (args: { v: number; value: number } & Nested) => any;
  array?: (args: { v: any[]; value: any[] } & Nested) => any;
  boolean?: (args: { v: boolean; value: boolean } & Nested) => any;
  object?: (args: { v: { [key: string]: any }; value: { [key: string]: any } } & Nested) => any;
  function?: (args: { v: (...args: any[]) => void; value: (...args: any[]) => void } & Nested) => any;
};

// Nested are within the Cases Callback
type Nested = {
  // Callback have these function
  default: Callback;
  D: Callback;

  // Number callback, as well as shorthand notations
  number: Callback;
  N: Callback;

  // String callback
  string: Callback;
  S: Callback;

  // Boolean Callback
  boolean: Callback;
  B: Callback;

  // Object callback
  object: Callback;
  O: Callback;

  // Undefined
  undefined: Callback;
  U: Callback;

  null: Callback;

  // Array Callback
  array: Callback;
  A: Callback;

  // Function callback
  function: Callback;
  F: Callback;
};
// Standard Callback Function
type Callback = (value?: any) => Promise<any>;

export const typeSwitchAsync: TypeSwitchAsync = async (input, cases) => {
  // Extracting the Default Function
  const defaultFunction = cases.default;
  // Get the name from the Constructor
  let name = typeName(input);
  // Checking if String is Empty
  if (isStringEmpty(name)) {
    // If it is empty then set to "undefined" or "null"
    name = isUndefined(input) ? 'undefined' : 'null';
  }

  // Extracting the Case Function
  const caseFunction = objectHasKey(cases, name) ? cases[name] : defaultFunction;

  const args: any = { value: input, v: input };
  objectEach(cases, ({ k, v }) => {
    // The Initial used for mapping
    const initial = stringUpperCase(k[0]);
    const callback = async (value: any) => v?.({ ...args, value, v: value });

    // Adding to Arguments
    args[k] = callback;
    args[initial] = callback;
  });

  // Calling Executed Values
  return isFunction(caseFunction) ? await caseFunction(args) : caseFunction;
};
