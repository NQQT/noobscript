import { isUndefined } from '../is/undefined';
import { UNDEFINED } from '../constants/primitive';
import { objectAlias } from '../object';

type Argument<T> = {
  index: number;
  value: T;
  length: number;
  callback: Callback<T>;
  // Short Hand Notation
  i: number;
  l: number;
  v: T;
  f: Callback<T>;
};

type Callback<T> = (args: Argument<T>) => any;
export type ArrayEach = <T>(list: T[], callback: Callback<T>) => any;
export type ArrayEachAsync = <T>(list: T[], callback: Callback<T>) => Promise<any>;

const getParams = <T>(list: T[], callback: Callback<T>): any => {
  const params = {
    value: UNDEFINED,
    index: 0,
    length: list.length,
    callback,
    result: UNDEFINED,
  };

  // Return the Params
  return objectAlias(params, {
    i: 'index',
    l: 'length',
    v: 'value',
    r: 'result',
    f: 'callback',
  });
};

/** Standard array each */
export const arrayEach: ArrayEach = (list, callback) => {
  const params = getParams(list, callback);

  for (; params.i < params.l; params.i++) {
    params.v = list[params.i];
    params.r = callback(params);
    if (!isUndefined(params.r)) break;
  }
  // Return the result
  return params.r;
};

/** Array Each Async Function */
export const arrayEachAsync: ArrayEachAsync = async (list, callback) => {
  const params = getParams(list, callback);

  for (; params.i < params.l; params.i++) {
    // Updating value
    params.v = list[params.i];
    // Setting the result
    params.r = await callback(params);
    // If result is not undefined, immediately break the loop
    if (!isUndefined(params.r)) break;
  }
  return params.r;
};
