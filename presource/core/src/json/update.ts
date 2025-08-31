import { objectEach } from '../object/each';
import { arrayEach } from '../array/each';
import { isEqual } from '../is/equal';
import { typeSwitch } from '../type/switch';
import { typeName } from '../type/name';
import { isArray } from '../is/array';
import { isObject } from '../is/object';

/** For Merging Two Json Object Together */
export const jsonUpdate = (primaryObject: any, secondaryObject: any) => {
  let result = primaryObject;

  // Only Process if Two Value Type are Equal to each other
  if (isEqual(typeName(primaryObject), typeName(secondaryObject)) && !isEqual(primaryObject, secondaryObject)) {
    // Scanning Through Switch Type
    typeSwitch(secondaryObject, {
      // Scanning Array
      array: () => {
        // Result Must be An Array. Or Overwite
        if (!isArray(result)) result = [];
        // Scanning Through Each Array
        arrayEach(secondaryObject, ({ value, index }) => {
          // Processing Through Individual Array
          result[index] = jsonUpdate(result[index], value);
        });
      },
      // Scanning Object
      object: () => {
        // Result Must be Object or Overwite
        if (!isObject(result)) result = {};
        // Scanning Through Second Object
        objectEach(secondaryObject, ({ value, key }) => {
          // Merging Into Result
          result[key] = jsonUpdate(result[key], value);
        });
      },
      default: () => {
        // For Everything Else. Simply Overwrite the Result
        result = secondaryObject;
      },
    });
  } else {
    // For Everything Else. Return Secondary Object
    result = secondaryObject;
  }

  // Return whatever result.
  return result;
};
