import { arrayCreate } from '../array/create';
import { arrayEach } from '../array/each';
import { typeSwitch } from '../type/switch';

type Keys = number | string | any[];
type Values =
  | number
  | string
  | boolean
  | undefined
  | null
  | any[]
  | (({ value, index, v, i }: { value: any; index: number; v: any; i: number }) => any);

/** Creating Object From Data */
export const objectCreate = (keys: Keys, values: Values) => {
  const result: { [key: string]: any } = {};

  // Converting Keys into proper string[]
  const keysList: string[] = typeSwitch(keys, {
    // If Number. Keys fill with 0 to number value
    // Number should be positive
    number: () => arrayCreate(keys as any).map((value, index) => index),
    // If String, return a single value
    string: () => [keys],
    // If input is an array.
    array: () => keys,
    // Default Return Array
    default: () => [],
  });

  // Return a Value Function
  const callback = typeSwitch(values, {
    // If Function. Return the Values
    function: () => values,
    array:
      ({ v }) =>
      // Construct a Remap Array by Key for Values
      ({ i }: { i: number }) =>
        v[i],
    // By Default. Create a Stand in Function
    default: () => () => values,
  });

  arrayEach(keysList, ({ v, i }) => {
    result[v] = callback({ v, i, value: v, index: i });
  });
  // Returning the Result
  return result;
};
