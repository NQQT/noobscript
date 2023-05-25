import { Params } from '..';
import { isInvalid } from '../../../is/invalid';
import { isEqual } from '../../../is/equal';
import { stringSwitch } from '../../../string/switch';
import { typeSwitch } from '../../../type/switch';
import { setCreate } from '../../../set/create';
import { arrayConstant } from '../../constant';
import { arrayEach } from '../../../array/each';

type Request = boolean | string | number | (boolean | string | number)[];
type KeysFunction = (params: Params, request: Request) => any[];

export const keysFunction: KeysFunction = (params, request) => {
  const { instance } = params;

  // For checking whether the value is valid or not
  // Creating a new result list
  const list = setCreate();
  const add = (index: number) => {
    list.add(index);
  };

  // Returning the Function
  typeSwitch(request, {
    // Get by matching indexes
    number: ({ v }) => {
      instance.each(({ i }) => {
        // Adding value into the list
        if (isEqual(i, v)) add(i);
      });
    },
    // Get by matching strings
    string: ({ v }) =>
      stringSwitch(v, {
        valid: () => {
          // Return value that are considered valid
          instance.each((data) => {
            if (!isInvalid(data.v)) add(data.i);
          });
        },
        invalid: () => {
          // Return value that are considered invalid
          instance.each((data) => {
            if (isInvalid(data.v)) add(data.i);
          });
        },
        odd: () => {
          // Returning only value with odd indexes
          instance.each((data) => {
            if (data.i % 2) add(data.i);
          });
        },
        even: () => {
          // Return only value with even indexes
          instance.each((data) => {
            if (!(data.i % 2)) add(data.i);
          });
        },
      }),
    // Get by matching boolean
    boolean: ({ v }) => {
      instance.each((data) => {
        // If matching boolean value then add to result
        if (isEqual(v, !!data.v)) add(data.i);
      });
    },
    array: ({ v, N, S, B }) => {
      // Checking through each array
      arrayEach(v, ({ value }) => {
        // Depending on the type. Update
        typeSwitch(value, {
          number: () => N(value),
          boolean: () => B(value),
          string: () => S(value),
        });
      });
    },
    // If no value. It is returned based on the filter criteria
    default: () => {
      instance.each(({ i }) => {
        // Adding Index
        add(i);
      });
    },
  });

  // Convert to Proper Array and Sort
  const result: number[] = arrayConstant().from(list);
  result.sort();

  // Returning the Key Result
  return result;
};
