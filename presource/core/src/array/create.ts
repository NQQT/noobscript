import { isUndefined } from '../is/undefined';
import { UNDEFINED } from '../constants/primitive';
import { typeSwitch } from '../type/switch';

type Arguments = {
  index: number;
  value: any;
  result: any;
};

type Callback = (args: Arguments) => any;
export type ArrayCreate = (input?: number | Callback) => any[];

/** For Creating a New Array Easily */
export const arrayCreate: ArrayCreate = (argument) => {
  // The Return Result
  const result: any[] = [];

  // Checking Argument Type
  typeSwitch(argument, {
    // If Function. It is considered as a Callback
    function: ({ v }) => {
      let index = 0;
      // Warning: Infinite Loop. Dangerous if not handle correctly
      while (1) {
        const value = v({ index });
        if (isUndefined(value)) break;
        result.push(value);
        // Incrementing Index
        index++;
      }
    },
    // If Number. Return an Array
    number: ({ v }) => {
      while (v--) result.push(UNDEFINED);
    },
  });

  // Returning the Final Result
  return result;
};
