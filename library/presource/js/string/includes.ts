/** String includes. Similiar to string.includes function, but alot more advance */

import { isFunction } from '../is/function';
import { objectEach } from '../object/each';
import { objectMap } from '../object/map';

type Argument<T> = {
  value: string;
} & { [key in keyof T]: (value?: string) => any };
type Callback<T> = (args: Argument<T>) => any;
type Cases<T> = { [key in keyof T]: Callback<T> | string | boolean | any[] };
type Structure = <T>(value: string, cases: Cases<T>) => { [key in keyof T]: any };

// Functiong to test switch String
export const stringIncludes: Structure = (value, cases) => {
  const found: any = {};

  // Remapping the cases value to params
  const params = objectMap(cases, ({ v }) => (isFunction(v) ? v : () => v));

  objectEach(cases, ({ k, v }) => {
    // Make Sure it is a String Key
    const key = k.toString();
    // Checking if k is within value
    if (value.includes(key)) {
      // Making sure value is a function
      found[key] = isFunction(v) ? v({ value, ...params }) : v;
    }
  });
  // Returning the Found Information
  return found;
};
