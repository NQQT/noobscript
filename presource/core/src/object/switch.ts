import { FALSE, TRUE } from '../constants/primitive';
import { objectEach } from './each';
import { objectHasKey } from './has';
import { objectMap } from './map';
import { objectUpdate } from './update';

// The Callback Argument for Access
type Argument<T> = {
  key: string;
  k: string;
  value: any;
  v: any;
  // The Default Function
  default: (value: any) => any;
} & { [key in keyof T]: (value: any) => any };

type Callback<T> = (args: Argument<T>) => any;

type Cases<T> = { default?: Callback<T> } & { [key in keyof T]: Callback<T> };

type Data = { [key: string]: any };
type Structure = <T>(value: Data, cases: Cases<T>) => any;

/** Object Switch Functionality */
export const objectSwitch: Structure = (data, cases) => {
  // Extracting Information from Cases
  const { default: fallback, ...rest } = cases;
  // The Trigger tells when the object has hit a switch
  let triggered = FALSE;

  // Setting up the Parameters with Relooped Keys
  const params: any = objectMap(cases, ({ value, key }) => {
    // Creating a Smart Reloop function
    return () => objectSwitch({ [key]: value }, cases);
  });

  // The Return Result of the Object Switch
  const result = objectEach(rest, ({ v, k }) => {
    // Checking if data has the key
    if (objectHasKey(data, k)) {
      // Get the Data
      const value = data[k];
      // Set Trigger to True For Switch to know when to stop
      triggered = TRUE;
      // Updating the Params with Value and Key
      objectUpdate(params, {
        value,
        v: value,
        k,
        key: k,
      });
      // Triggering the Value function
      return v(params);
    }
  });

  // Testing Return result
  if (triggered) return result;
  // if Fallback is Triggered instead
  if (fallback) return fallback(params);
  // Else return undefined.
};
