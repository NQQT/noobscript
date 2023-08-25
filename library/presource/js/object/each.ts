import { UNDEFINED } from '../constants/primitive';
import { isUndefined } from '../is/undefined';
import { objectAlias } from './alias';
import { objectKeys } from './keys';

type Arguments<T, K extends keyof T> = {
  array: keyof T;
  key: K;
  value: T[K];
  object: T;
  index: number;
  length: number;
  result: any;
  callback: Callback<T, K>;

  // Shorthand Notations
  a: keyof T;
  l: number;
  o: T;
  k: K;
  v: T[K];
  r: any;
  i: number;
  c: Callback<T, K>;
};

// Constructing the Callback
type Callback<T, K extends keyof T> = (args: Arguments<T, K>) => any;
type Structure = <T extends {}, K extends keyof T>(object: T, callback: Callback<T, K>) => any;

/** The Alias Key for Object Each incase another data is using it */
export const objectEachAliasKey = {
  a: 'array',
  k: 'key',
  v: 'value',
  i: 'index',
  o: 'object',
  l: 'length',
  r: 'result',
  c: 'callback',
};

const getParams: Structure = (object, callback) => {
  const array = objectKeys(object);
  const params = {
    array,
    key: UNDEFINED,
    value: UNDEFINED,
    index: 0,
    object,
    length: array.length,
    result: UNDEFINED,
    callback,
  };

  // Returning Proxy Params
  return objectAlias(params, objectEachAliasKey);
};

/** Standard Object Each Scanning */
export const objectEach: Structure = (object, callback) => {
  const params = getParams(object, callback);
  // Running Loop Function
  for (; params.i < params.length; params.i++) {
    params.k = params.a[params.i];
    params.v = params.o[params.k];
    params.r = callback(params);
    if (!isUndefined(params.r)) break;
  }
  // Always return the last result
  return params.r;
};

export const objectEachAsync: Structure = async (object, callback) => {
  // Get the params
  const params = getParams(object, callback);
  for (; params.i < params.length; params.i++) {
    params.k = params.a[params.i];
    params.v = params.o[params.k];
    params.r = await callback(params);
    if (!isUndefined(params.r)) break;
  }
  // Always return the last result
  return params.r;
};
