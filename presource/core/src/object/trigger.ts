/**
 *
 * Isn't this similar to objectSwitch?
 * Trigger happens whenever there is a value within the input object
 *
 */

import { isObject } from '../is/object';
import { objectEach } from './each';
import { objectHasKey } from './has';
import { objectUpdate } from './update';

type Input = { [key: string]: any };
type Output = { [key: string]: any };
type Arguments = {
  value: any;
  key: string;
  input: Input;
  i: Input;
  o: Output;
  output: Output;
  v: any;
  k: string;
};
type TriggerFunction = (args: Arguments) => any;
type TriggerList = { [key: string]: TriggerFunction };

/** Opposite of Object Reduce. This will expand the object */
export const objectTrigger = (input: Input, triggers: TriggerList) => {
  // The Output. Copying Exactly the Input
  const output: Output = {};
  // Scanning Through the Input
  objectEach(input, ({ v, k }) => {
    if (objectHasKey(triggers, k)) {
      // Constructing the Required Params
      const params: any = {
        value: v,
        v,
        key: k,
        k,
        input,
        i: input,
        output,
        o: output,
      };

      // Constructing the Result
      const result = triggers[k](params);
      // Continue if It is an Object
      if (isObject(result)) objectUpdate(output, result);
    } else {
      // Setting to itself
      output[k] = v;
    }
  });
  // Returning the Output Object
  return output;
};
