import { isEqual } from '../is/equal';
import { isUndefined } from '../is/undefined';
import { objectEach } from '../object/each';
import { setCreate } from '../set/create';
import { stringSwitch } from '../string/switch';
import { typeSwitch } from '../type/switch';
import { functionProxy } from './proxy';

// The setting for the function group
type Setting = {};
// The Callback Parameters
type Callback = (...params: any[]) => any;
type Wrapper = (callback: Callback | string | number | boolean) => any;

// This is based on react useState, but all resolved around function instead
export const functionState = (setting: Setting = {}): Wrapper => {
  // The recorded value list
  const values: any[] = [];
  // The State function
  const state: any[] = [];
  // The Trigger List
  const triggers: any[] = [];
  // Record of Triggers
  const triggered = (index: number) => {
    // Save Trigger Records
    if (triggers.length) {
      const triggerIndex = triggers.length - 1;
      const trigger = triggers[triggerIndex] || {};
      // Incrementing Trigger by one.
      trigger[index] = (trigger[index] || 0) + 1;
      triggers[triggerIndex] = trigger;
    }
  };

  // Chained Reaction
  const chained: any[] = [];
  // Propagate up the chain of command
  const propagate = (index: number, value: any) => {
    // If new value is different than previous value
    if (!isEqual(values[index], value)) {
      // Overwriting Old Value
      values[index] = value;
      // Triggering Callback
      chained[index].forEach((callback: any) => {
        // Triggering the data updater by index
        state[callback]?.();
      });
    }
  };

  // Return the Wrapper to Add Input
  return (input: any) => {
    // Getting the Index
    const index = values.length;
    // Creating a New Set for Chaining
    chained[index] = setCreate();
    // Creating a Callback Function
    const callback = typeSwitch(input, {
      // If value is a function
      function: ({ v }: any) => {
        // // If Funtion is Async. Return async function
        // if (isFunctionAsync(v)) {
        //   return async (...params: any[]) => {
        //     triggers.push([]);
        //     // Async. Await
        //     const result = await v();
        //     // Get the list of dependent and add to chain
        //     objectEach(triggers.pop(), ({ k }: any) => {
        //       // Adding current function into Chain
        //       chained[k].add(index);
        //     });
        //     // Returning the Result
        //     return result;
        //   };
        // }

        return (...params: any[]) => {
          // Adding Trigger Recorder
          triggers.push([]);
          // Passing in the parameters
          const result = v();
          // Get the list of dependent and add to chain
          objectEach(triggers.pop(), ({ k }: any) => {
            // Adding current function into Chain
            chained[k].add(index);
          });
          // Returning the Result
          return result;
        };
      },
      // Triggering by Default
      default: ({ v }) => {
        // Store the initial value
        values[index] = v;
        // Return a callback function
        return (value?: any) => {
          // If value is undefined, return the data value
          if (isUndefined(value)) return values[index];
          // Simply return the value
          return value;
        };
      },
    });

    // First time trigger, stored the first values
    values[index] = callback();

    // The State Wrapper Function
    state[index] = functionProxy(({ method, params }) => {
      // Return whatever data is triggered
      return stringSwitch(method, {
        // If Call method is envoked
        call: () => {
          // Triggered
          triggered(index);
          // Triggering Callback
          const response = callback(...params);
          // Propagate up the chain
          propagate(index, response);
          // Returning the value in the index
          return values[index];
        },
      });
    });
    // Return the State Function
    return state[index];
  };
};
