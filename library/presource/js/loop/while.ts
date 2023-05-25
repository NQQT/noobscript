import { isUndefined } from '../is/undefined';
import { UNDEFINED } from '../constants/primitive';

type Argument = {
  // Standard Arguments
  condition: Condition;
  callback: Callback;
  count: number;
  // This will always be the previous result
  result: any;
};

// Type control for Condition
type Condition = (args: Argument) => boolean;

// Type control for Callback
type Callback = (args: Argument) => any;

// Loop While Functionality
export const loopWhile = (condition: Condition, callback: Callback) => {
  // Setting up the Argument Parameters
  const params: Argument = {
    condition,
    callback,
    count: 0,
    result: UNDEFINED,
  };

  // Triggering While Loop Function
  while (condition(params)) {
    // Store Into the Result
    const result = callback(params);
    if (!isUndefined(result)) break;

    // Updating the Parameters
    params.count++;
    params.result = result;
  }
  // Return the Final Result
  return params.result;
};
