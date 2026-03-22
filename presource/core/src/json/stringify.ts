import { objectStringify } from '../object';
import { typeSwitch } from '../type';

/** Stringify Object with Json Stringify */
export const jsonStringify = (item: any) =>
  typeSwitch(item, {
    // If Object. Stringify
    object: () => objectStringify(item),
    // Use default json stringify
    default: () => JSON.stringify(item),
  });
