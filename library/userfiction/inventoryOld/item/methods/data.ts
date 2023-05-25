import { objectUpdate, typeSwitch, stringSwitch, objectKeys, arrayEach, objectHasKey } from '@library/presource';
import { InventoryItem } from '..';

type Structure = (data: Parameters<InventoryItem>[0], request: any) => any;

/** Inventory Data method */
export const methodInventoryItemData: Structure = (data, request) => {
  const keyList = {
    // Return the value
    value: () => data.value || 0,
    // Return the data type or value as solid
    type: () => data.type || 'solid',
    // Either Return the Limit size or infinity
    size: () => data.size || Infinity,
  };

  return typeSwitch(request, {
    object: ({ v }) => {
      // updating the Data with Value
      objectUpdate(data, v);
    },
    array: ({ v }) => {
      // Setting up the Return result
      const result: { [key: string]: any } = {};
      arrayEach(v, ({ v: key }) => {
        if (objectHasKey(keyList, key)) {
          // Updating the result with keys
          result[key] = keyList[key]();
        }
      });
      // Returning the Result
      return result;
    },
    // If request is a string, it will extract data correctly
    string: ({ v }) => stringSwitch(v, keyList),
    // Default. Return data
    default: ({ A }) => A(objectKeys(keyList)),
  });
};
