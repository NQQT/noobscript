/** Is Function Logic.
 *
 * This check the array
 *
 */

import { Params } from '..';
import { FALSE, TRUE } from '../../../constants/primitive';
import { UNDEFINED_STRING } from '../../../constants/string';
import { isEqual } from '../../../is/equal';
import { stringSwitch } from '../../../string/switch';
import { typeSwitch } from '../../../type/switch';

type RequestString = 'empty' | 'valid' | 'filled' | 'valid' | 'invalid';
type Request = RequestString;
type IsFunction = (params: Params, request: Request) => boolean;

export const isFunction: IsFunction = (params, request) => {
  const { instance } = params;
  return typeSwitch(request, {
    string: () =>
      stringSwitch(request, {
        // Checking whether the array is empty
        empty: () => isEqual(instance.count(), 0),
        // Whether array is filled with proper value
        valid: () => isEqual(instance.count('invalid'), 0),
        invalid: ({ valid }: any) => !valid,
        // Whether array is filled correctly or not
        // Meaning it must not be empty and it must not have undefined as a value
        filled: ({ empty }: any) => !empty() && isEqual(instance.count(UNDEFINED_STRING), 0),
        // By default. Return as false
        default: () => FALSE,
      }),

    // By Default. Return this as true
    default: () => TRUE,
  });
};
