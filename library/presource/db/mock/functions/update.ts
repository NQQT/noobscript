import { TRUE } from '../../../js/constants/primitive';
import { jsonUpdate } from '../../../js/json/update';
import { objectHasKey } from '../../../js/object/has';

export const updateFunction = (memory: any, data: { [key: string]: any }) => {
  const { key, reference } = memory();
  // Get the Primary value
  const primaryValue = data[key];
  // Checking if Primary Value Exists or not
  if (primaryValue && objectHasKey(reference, primaryValue)) {
    // Update With References
    jsonUpdate(reference[primaryValue], data);
    return TRUE;
  }
};
