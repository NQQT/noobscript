/** Switch Cases, but based on string */

import { objectHasKey, objectMap } from '../object';
import { isFunction } from '../is';

type Argument<T> = {
  value: string;
  default: (value: any) => any;
} & { [key in keyof T]: (value: any) => any };
type Callback<T> = (args: Argument<T>) => any;
type Cases<T> = { default?: string | Callback<T> } & { [key in keyof T]: any | Callback<T> };
type Structure = <T>(value: number | string, cases: Cases<T>) => any;

const getParams: Structure = (value, cases) => {
  // Setting up Advance Parameters
  const params: any = objectMap(
    // Mapping Over all the Cases
    cases,
    ({ key }) =>
      () =>
        stringSwitch(key as string, cases),
  );

  params.value = value;
  params.default = () => cases.default;
  return params;
};

// Functiong to test switch String
export const stringSwitch: Structure = (value, cases) => {
  // Getting the Correct Callback
  const callback = objectHasKey(cases, value) ? cases[value] : cases.default;
  // Guard Clause. To Prevent Excessive Load.
  if (!isFunction(callback)) return callback;
  // Triggering the callback
  return callback(getParams(value, cases));
};

/** String Async */
export const stringSwitchAsync = async (value: any, cases: any) => {
  // Getting the Correct Callback
  const callback: Promise<any> = objectHasKey(cases, value) ? cases[value] : cases.default;
  // Guard Clause. To Prevent Excessive Load.
  if (!isFunction(callback)) return callback;

  return await callback(getParams(value, cases));
};
