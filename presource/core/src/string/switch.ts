/** Switch Cases, but based on string */

import { objectHasKey } from '../object/has';
import { objectMap } from '../object/map';
import { isFunction } from '../is/function';

type Argument<T> = {
  value: string;
  default: (value: any) => any;
} & { [key in keyof T]: (value: any) => any };
type Callback<T> = (args: Argument<T>) => any;
type Cases<T> = { [key in keyof T]: any | Callback<T> } & { default?: any | Callback<T> };
type Structure = <T extends { [key: string]: any }>(value: number | string, cases: Cases<T>) => any;

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
