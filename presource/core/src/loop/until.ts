import { UNDEFINED } from '../constants';
import { isUndefined } from '../is';

// Setting up the Type Arguments
type Argument = {
  condition: Condition;
  callback: Callback;
  result: any;
  count: number;
};

// The Until Condition
type Condition = (args: Argument) => boolean;

// The Callback Function
type Callback = (args: Argument) => any;

// Loop Until a Condition is True. Similar to LoopWhile, but slightly different
export const loopUntil = (condition: Condition, callback: Callback) => {
  // The Parameter
  const params: Argument = {
    condition,
    callback,
    result: UNDEFINED,
    count: 0,
  };
  while (!condition(params)) {
    // Store Into the Result
    const result = callback(params);
    if (!isUndefined(result)) break;

    // Updating the Parameters
    params.count++;
    params.result = result;
  }
};
