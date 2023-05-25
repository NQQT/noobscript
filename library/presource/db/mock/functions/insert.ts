import { objectHasKey } from '../../../js/object/has';

// Standard Insert Function for Mock Database
export const insertFunction = (memory: any, data: { [key: string]: any }) => {
  // Extracting Important Information
  const { key, database, reference } = memory();

  // Get the Primary Value
  const primaryValue = data[key];

  // If Reference doesn't have Key. Then Process it. Return True.
  if (primaryValue && !objectHasKey(reference, primaryValue)) {
    // Push Data into Database
    database.push(data);
    // Creating Referenced Link
    reference[primaryValue] = data;
    // Return the Inserted Data
    return data;
  }
};
