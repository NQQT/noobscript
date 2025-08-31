import { isUndefined } from '../is';
import { UNDEFINED } from '../constants/primitive';
import { objectAlias } from '../object/alias';

type Argument = {
  callback: Callback;
  index: number;
  length: number;
  count: number;
  result: any;

  // Shorthand Notations
  r: any;
  l: number;
  i: number;
  f: Callback;
  c: number;
};

// The Mapping of Callback Function
type Callback = (args: Argument) => any;

type Structure = (
  // The length
  length: number,
  // The callback function
  callback: Callback,
  // Start function
  start?: number,
) => any;

const getParams: Structure = (length, callback, start = 0) => {
  // Setting up the Arguments
  const args = {
    // Index
    index: start,
    // The Callback Function
    callback,
    // Length
    length,
    // Counter
    count: 0,
    result: UNDEFINED,
  };

  // Setting the Params
  const params = objectAlias(args, {
    f: 'callback',
    i: 'index',
    l: 'length',
    r: 'result',
    c: 'count',
  });

  return params;
};

/** Loop For Functionality. Use for loop for speed. */
export const loopFor: Structure = (length, callback, start = 0) => {
  // Getting the Record
  const record = getParams(length, callback, start);
  // Loop For Callback
  while (record.i < record.l) {
    // Getting Result from Loop
    record.r = callback(record);
    // If Result is Undefined. Automatically Break out of the Loop
    if (!isUndefined(record.r)) break;
    // Updating Parameters for later
    record.i++;
    // Updating the Count Variable
    record.c++;
  }
  // Returning the Result at the End
  return record.result;
};

/** Async Loop For Function */

type StructureAsync = (
  // The length
  length: number,
  // The callback function
  callback: Callback,
  // Start function
  start?: number,
) => Promise<any>;

export const loopForAsync: StructureAsync = async (length, callback, start = 0) => {
  const record = getParams(length, callback, start);
  for (; record.i < record.l; record.i++) {
    // Getting a new result
    record.r = await callback(record);
    // If Undefined
    if (!isUndefined(record.r)) break;
    record.c++;
  }
  return record.r;
};
