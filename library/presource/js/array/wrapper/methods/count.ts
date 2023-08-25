import { Params } from '..';
import { isInvalid } from '../../../is/invalid';
import { isBoolean } from '../../../is/boolean';
import { isNumber } from '../../../is/number';
import { isObject } from '../../../is/object';
import { isString } from '../../../is/string';
import { typeSwitch } from '../../../type/switch';
import { isValid } from '../../../is/valid';
import { isNull } from '../../../is/null';
import { isUndefined } from '../../../is/undefined';

type RequestString = 'string' | 'boolean' | 'number' | 'invalid' | 'valid' | 'null' | 'undefined';
type Request = RequestString;
type CountFunction = (params: Params, request: Request) => number;

export const countFunction: CountFunction = (params, request) => {
  // Getting an instance from params
  const { instance } = params;
  let count = 0;

  // using each so that select is also an option
  instance.each(
    typeSwitch(request, {
      // String format
      string: ({ v }) => {
        // List of possible Options
        const options: any = {
          string: isString,
          object: isObject,
          number: isNumber,
          boolean: isBoolean,
          invalid: isInvalid,
          valid: isValid,
          null: isNull,
          undefined: isUndefined,
        };
        // The Check Function
        const checkFunction = options[v];

        return (data: any) => {
          if (checkFunction(data.v)) count++;
        };
      },
      default: () => {
        // Return a count function
        // Couldn't use element directly due to "select"
        return () => {
          count++;
        };
      },
    }),
  );
  return count;
};
