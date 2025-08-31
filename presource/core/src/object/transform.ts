import { isEqual } from '../is/equal';
import { isObject } from '../is/object';
import { isUndefined } from '../is/undefined';
import { typeSwitch } from '../type/switch';
import { objectEach } from './each';
import { objectHasKey } from './has';
import { objectKeys } from './keys';

type Item = { [key: string]: any };

type Arguments = {
  key: string;
  value: any;
  input: Item;
  output: Item;

  // Shortcut hand
  k: string;
  v: any;
  i: Item;
  o: Item;
};
type Callback = (...args: Arguments[]) => any;
type Transformers = { [key: string]: string | number | boolean | Callback | Transformers };
type Structure = (input: Item, transforms: Transformers, layers?: Arguments[]) => Item;

/** Return an output with transformed data on an input (if necessary) */
export const objectTransform: Structure = (input, transformers, layers = []) => {
  // The Resulting object
  const output: Item = {};
  // Getting the amount of invalid total
  let invalid = objectKeys(transformers).length;
  // Making sure input is an object
  input = isObject(input) ? input : {};

  const processData = (k: string, v: any) => {
    // Getting the input value
    const inputValue = input[k];

    // The Current param level
    const params: any = [
      {
        key: k,
        value: inputValue,
        input,
        output,

        // Short hand notation
        i: input,
        o: output,
        k,
        v: inputValue,
      },
    ].concat(layers);

    const transformedValue = typeSwitch(v, {
      function: (data) => {
        // Return the transform data
        return data.v(...params);
      },
      // If it is an object, then try to do nesting
      object: (data) => {
        // Nested transformation
        return objectTransform(inputValue, data.v, params);
      },
      default: () => v,
    });

    if (!isUndefined(transformedValue)) {
      // Only save to output if transformed value is not undefined
      output[k] = transformedValue;
      invalid--;
    }
  };

  // Continuing to resolve!
  while (invalid) {
    const remaining = invalid;
    // Scanning through each item and apply transformation
    objectEach(transformers, ({ k, v }: any) => {
      // Continue to process until validation is complete
      if (!objectHasKey(output, k)) {
        processData(k, v);
      }
    });

    // Nothing changes, meaning cannot resolve further
    if (isEqual(remaining, invalid)) break;
  }

  // Return the resulting object
  return output;
};
