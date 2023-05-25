/**
 *
 * For converting object into proper styled object
 *
 */

import { arrayEach } from '../../js/array/each';
import { TRUE } from '../../js/constants/primitive';
import { isArray } from '../../js/is/array';
import { objectEach } from '../../js/object/each';
import { objectSwitch } from '../../js/object/switch';
import { objectUpdate } from '../../js/object/update';
import { typeSwitch } from '../../js/type/switch';
import { MapperCallback, MapperCallbackList, StyledObject } from './assets/interface';

/** Transcribing Object */
export const objectStyled = (input: StyledObject, resolvers: MapperCallbackList, output: StyledObject = {}) => {
  // Scanning through the input object
  objectEach(input, ({ k: inputKey, v: inputValue }) => {
    // The Resolving Callback
    const resolve = (resolver: MapperCallback | MapperCallback[]) => {
      // Constructing the Necessary Parameters
      const params: any = {
        value: inputValue,
        key: inputKey,
        v: inputValue,
        k: inputKey,
        input,
        i: input,
        output,
        o: output,
      };

      // Extract the Resolver Function
      arrayEach(isArray(resolver) ? resolver : [resolver], ({ v: resolverFunction }) => {
        // Internal Result
        typeSwitch(resolverFunction(params, resolvers), {
          string: ({ v }) => {
            // If String is Returned
            output[inputKey] = v;
          },
          object: ({ v }) => {
            // Updating output object
            objectUpdate(output, v);
          },
        });
      });
    };

    // Object switch against the resolvers not the data
    objectSwitch(resolvers, {
      // If Matching Input Key. Trigger
      [inputKey]: () => {
        // Extracting the Resolver Function
        const resolver = resolvers[inputKey];
        // Triggerin the Resolver
        resolve(resolver);
        // Break out if one hit. This is is to prevent Continous Switch
        return TRUE;
      },
      // If nothing matches above. Trigger The following if it exists
      '*': () => {
        // Loading Prematch information...
        const resolver = resolvers['*'];
        // Triggering the Resolver
        resolve(resolver);
        // Break out if this also hit. Prevent continous switching
        return TRUE;
      },
      // By Default if no route matches
      default: () => {
        // If nothing matches. Store value as it is
        output[inputKey] = inputValue;
      },
    });
  });

  // Returning the Style Object
  return output;
};
