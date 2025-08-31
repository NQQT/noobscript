import { typeSwitch } from '../type/switch';
import { objectEach } from '../object/each';
import { isUndefined } from '../is/undefined';
import { UNDEFINED } from '../constants/primitive';

type Cases = { [key: string]: any };
type Argument<T> = { key: string; k: string; value: boolean; v: boolean; result: keyof T };
type Callback<T> = (arg: Argument<T>) => any;

/** Boolean each function is different than arrayEach or objectEach. It is check against the logic */
export const booleanCases = <T extends Cases>(cases: T, callback?: Callback<T>, caller?: any) => {
  // The Complete Result
  const result: any = {};
  // Using Object Each
  const feedback = objectEach(cases, ({ k, v }: any) => {
    // Triggering the Value Evaluations
    const value: any = typeSwitch(v, {
      // Special case: Recursive. Nested Result. Route through the caller if it is given, however.
      object: () => (caller ? caller(value) : booleanCases(v, callback)),
      // If It is a Function. Evaluate It Accordingly
      function: () => !!v(result),
      // By Default. Evaluate the Value as it is
      default: () => !!v,
    });
    // Updating the Ongoing Result
    result[k] = value;
    // Triggering the Callback
    return callback
      ? callback({
          value,
          v: value,
          key: k,
          k,
          result,
        })
      : UNDEFINED;
  });

  // Only Return the Feedback if it is not undefine. Else. Return the Result
  return !isUndefined(feedback) ? feedback : result;
};
