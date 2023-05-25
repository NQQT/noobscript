import { objectUpdate } from '../../../js/object/update';
import { typeSwitch } from '../../../js/type/switch';
import { objectStyled } from '..';
import { arrayEach } from '../../../js/array/each';
import { objectHasKey } from '../../../js/object/has';
import { objectEach } from '../../../js/object/each';
import { MapperArguments, MapperCallback } from '../assets/interface';

// Helper for Callback
type Callback = (args: MapperArguments) => any;

/** Easier way to construct attribute resolver */
export const objectMapAttribute = (callback: Callback): MapperCallback => {
  // Return a Resolver Function
  return (data, resolvers) => {
    const { key, output } = data;

    const triggerCallback = (value: any) => {
      // Get the value
      const result = callback({ ...data, value, v: value });
      // Checking what value the callback returned
      typeSwitch(result, {
        // If it is an object. Updating the Object
        object: () => {
          // Adding to the output
          objectUpdate(output, result);
        },
      });
    };

    // The Decoder Function
    const evalulateValue = (value: any) => {
      // Setting Type Switch
      typeSwitch(value, {
        array: ({ v }) => {
          arrayEach(v, (item: any) => {
            // Passing through the decode value function
            evalulateValue(item.v);
          });
        },
        // if it is an object. Auto resolve
        object: () => {
          // Storing Nested Value
          const nestedValue: any = {};

          objectEach(value, ({ k, v }) => {
            // Must check if resolver has key within or will be stuck in infinite loop!
            if (objectHasKey(resolvers, k)) {
              // If is. Added to Nested Value to Continue
              nestedValue[k] = { [key]: v };
            } else {
              // Triggering callback instead
              triggerCallback({ [k]: v });
            }
          });

          // Calculating the nested value information
          const nested = objectStyled(nestedValue, resolvers);
          // Adding to Output
          objectUpdate(output, nested);
        },
        // By Default. Run value
        default: ({ v }) => {
          // Triggering Callback with the value
          triggerCallback(v);
        },
      });
    };
    // Trigger First Evaluation
    evalulateValue(data.v);
  };
};
