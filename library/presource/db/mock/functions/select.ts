import { objectHasKey } from '../../../js/object/has';
import { populateFunction } from './populate';

/** Mock Database. Select Functionality */
export const selectFunction = (memory: any, primaryKey: string) => {
  // Getting the Memory
  const { key, database, reference } = memory();

  // If Primary Key Doesn't Exists
  if (!objectHasKey(reference, primaryKey)) {
    const generatedData = { [key]: primaryKey };
    // Adding Data into List
    database.push(generatedData);
    // Create a Reference Map
    reference[primaryKey] = generatedData;

    // Populate Data after reference has been created
    populateFunction(memory, generatedData);
  }
  // Return the Selected Data
  return reference[primaryKey];
};
