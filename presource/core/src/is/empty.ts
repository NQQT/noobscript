import { arrayEach } from '../array/each';
import { FALSE, TRUE } from '../constants/primitive';
import { EMPTY_STRING } from '../constants/string';
import { objectEach } from '../object/each';
import { typeSwitch } from '../type/switch';
import { isEqual } from './equal';

/** Checking if value is empty or not */
export const isEmpty = (input: any) =>
  typeSwitch(input, {
    // For number, only check whether input is a NaN value
    number: () => isNaN(input),
    // For String. Checking empty String
    string: () => isEqual(input.trim(), EMPTY_STRING),
    array: () => isEmptyArray(input),
    object: () => isEmptyObject(input),
    // By Default. Return True
    default: () => !!input,
  });

/** For checking wehther an array is empty or not */
export const isEmptyArray = <T>(unknown: any): unknown is T[] => {
  // By Default. Value is empty
  let result = TRUE;
  // Scanning through each array item
  arrayEach(unknown, ({ v }) => {
    // if is not empty. Breakout of the loop
    if (!isEmpty(v)) return (result = FALSE);
  });
  // Returning the Result
  return result;
};

/** For checking whether an object is empty or not */
export const isEmptyObject = (unknown: any): unknown is {} => {
  let result = TRUE;

  // Scanning through each object item
  objectEach(unknown, ({ v }) => {
    // If value is not empty, break out the object loop
    if (!isEmpty(v)) return (result = FALSE);
  });
  // Returning the result
  return result;
};
