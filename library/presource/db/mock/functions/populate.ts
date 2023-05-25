import { objectEach } from '../../../js/object/each';
import { objectHasKey } from '../../../js/object/has';

export type PopulateGenerator = (data: { [key: string]: any }) => any;

// The Main Function
export const populateFunction = (memory: any, data: { [key: string]: any } = {}) => {
  // Get the Structure out of the Populate Generator
  const structure: { [key: string]: PopulateGenerator } = memory('structure');

  // Scanning Through Each Data to see if it requires populating or not.
  objectEach(structure, ({ k, v }) => {
    // Scanning Through each Object
    if (!objectHasKey(data, k)) {
      // Updating the result with value
      data[k] = v(data);
    }
  });

  // Returning the Result
  return data;
};
