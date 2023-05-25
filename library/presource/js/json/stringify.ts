import { objectStringify } from '../object/stringify';
import { typeSwitch } from '../type/switch';
import { jsonConstant } from './constant';

/** Stringify Object with Json Stringify */
export const jsonStringify = (item: any) =>
  typeSwitch(item, {
    // If Object. Stringify
    object: () => objectStringify(item),
    // Use default json stringify
    default: () => jsonConstant().stringify(item),
  });
