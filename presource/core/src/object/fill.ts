import { objectEach } from './each';
import { objectHasKey } from './has';

// Object Fill. Filling in the gap that object doesn't have
export const objectFill = (object: any, fill: { [key: string]: any }) => {
  // Scanning Through Each Object
  objectEach(fill, ({ k, v }) => {
    // Checking whether object key exists or not
    if (!objectHasKey(object, k)) {
      // If Object doesn't have value. Add value to object.
      object[k] = v;
    }
  });
  // Return a copy of the result. Keep Reference
  return { ...object };
};
