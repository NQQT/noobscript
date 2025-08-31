import { ObjectConstant } from './constant';
import { objectProxy } from './proxy';

/** Interface of Object Alias */
export type ObjectAlias = <Data extends ObjectConstant, Alias extends ObjectConstant>(
  data: Data,
  alias: Alias,
) => {
  // Combining data of Data and Alias, but the value should belong to Data only
  [key in keyof Data | keyof Alias]: Data[keyof Data];
};

/** Aliasing a key within an object */
export const objectAlias: ObjectAlias = (data: any, alias: any) => {
  const getActualKey = (key: string) => alias[key] || key;

  // Constructing an Object Alias
  return objectProxy(data, {
    get: ({ k }) => data[getActualKey(k)],
    set: ({ k, v }) => {
      data[getActualKey(k)] = v;
    },
  });
};
