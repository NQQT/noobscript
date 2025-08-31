import { NULL } from '../constants';
import { isEqual, isNull } from '../is';
import { stringSwitch } from '../string';
import { functionProxy } from './proxy';

type Data = {
  // Chain String Array
  chain: string[];
  // The current key
  key: null | string;
  // The index in the chain
  index: number;
  // The parameter that was passed
  params: any[];
};

// The That Pass into Callback
type Callback = (data: Data) => any;
type ReturnFunction = {
  (...input: any[]): ReturnFunction;
  [key: string]: ReturnFunction;
};

type FunctionChain = (callback: Callback) => ReturnFunction;

/** Function chaining,  */
export const functionChain: FunctionChain = (callback) => {
  // The Chain Memory
  let chain: string[] = [];
  // The Initial Index
  let index = 0;
  // The Key String
  let key: null | string = NULL;
  // This is the pending caller.
  let pending: any = NULL;

  // This is to reset all the parameters
  const reset = () => {
    chain = [];
    index = 0;
    key = NULL;
  };

  // Building the Chain Function from the Function Proxy
  const chainFunction = functionProxy((data) => {
    // Checking the configurations
    return stringSwitch(data.method, {
      // if method is called
      call: () => {
        // Extracting the parameters
        const params = data.params;

        if (isNull(data.key)) {
          // The Root function is called. Hard reset is needed
          reset();
        } else {
          // Adding to Chain List
          chain.push(key!);
        }

        // If there is pending item
        if (pending && !isEqual(index, pending.index)) {
          // Trigger only if index and pendingIndex is different
          pending.callback(params);
          // Else Triggering the result
        }

        // Passing the parameter
        const result = callback({ chain, index, key, params });
        // Clearing the Pending List
        pending = NULL;
        // Return the Result or chainfunction for further chaining
        return result || chainFunction;
      },
      // if method is get
      get: () => {
        // if get method, always increment index by 1
        index++;
        // remember to set data key
        key = data.key;

        // If there is Pending. Call it!
        if (pending) pending.callback();

        // Constructing a pending caller
        // This is for calling later on if "call method" is not triggered
        pending = {
          callback: (...params: any[]) => callback({ chain, index: pending.index, key: pending.key, params }),
          index,
          key,
        };
        // Returning the Callback
        return chainFunction;
      },
    });
  });

  // Returnin the Chain Function
  return chainFunction as ReturnFunction;
};
