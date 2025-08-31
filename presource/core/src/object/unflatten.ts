/**
 *
 * Unflatten attemps to undo flatten, but it is not 100% accurate.
 * Cannot really make it 100% accurate due to not 1 to 1 binding
 *
 */

import { arrayEach } from '../array/each';
import { arrayEnsures } from '../array/ensures';
import { isEqual } from '../is/equal';
import { isUndefined } from '../is/undefined';
import { toString } from '../to/string';
import { typeSwitch } from '../type/switch';
import { objectEach } from './each';
import { objectKeys } from './keys';
import { objectMerge } from './merge';

// The Expanding Structure
type Item = { [key: string]: any };
type Structure = (input: Item) => Item;

export const objectUnflatten: Structure = (input) => {
  // The result that is returned
  const result: Item = {};

  objectEach(input, ({ k: chain, v: value }) => {
    // Let the current is the result

    let previous: any = result;
    let current: any = previous;
    let pointer: any;

    const appendValue = (addValue: any) => {
      // This is to save the buffered value
      const savedValue = current[''];
      let newValue = savedValue;

      if (!isUndefined(savedValue)) {
        newValue = arrayEnsures(savedValue);

        // Adding New value to the List of Array
        newValue.push(addValue);
      } else {
        newValue = addValue;
      }
      // Updating the Current Value Place
      current[''] = newValue;
    };

    // Scanning through the object chain, and reading each key
    arrayEach(toString(chain).split('.'), ({ v: key }) => {
      // Making sure that current is always an object
      current[key] = typeSwitch(current[key], {
        object: ({ v }) => v,
        // If undefined. Return empty object
        undefined: () => ({}),
        // By default. return the object
        default: ({ v }) => ({ '': v }),
      });
      // Save Object to Previous
      previous = current;
      current = current[key];
      // Saving the Pointer to Store Value into
      pointer = key;
    });

    // Adding to Current Pointer
    typeSwitch(value, {
      object: () => {
        // if Value is an object, run recursive
        previous[pointer] = objectMerge(current, objectUnflatten(value));
      },
      // Appending Value to the Current Pointer Position
      default: () => appendValue(value),
    });

    // Shifting Data
    const currentKeys = objectKeys(current);
    if (isEqual(currentKeys.length, 1) && currentKeys.includes('')) {
      // If Currenty keys is only 1, and it only includes the empty space
      // Then move it to top level
      previous[pointer] = current[''];
    }
  });

  // Returning the Result
  return result;
};
