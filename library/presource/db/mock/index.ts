import { arrayDatabase } from '../array';
import { insertFunction } from './functions/insert';
import { selectFunction } from './functions/select';
import { updateFunction } from './functions/update';
import { PopulateGenerator } from './functions/populate';
import { objectKeys } from '../../js/object/keys';
import { objectRegistry } from '../../js/object/registry';
import { typeSwitch } from '../../js/type/switch';
import { objectHasKey } from '../../js/object/has';
import { arrayEach } from '../../js/array/each';

type Structure = {
  // Basic Function. Accept the Generator Function for Now
  [key: string]: PopulateGenerator;
};

/** Mock Database. Constructor to use */
export const mockDatabase = (...setting: (string | Structure)[]) => {
  // Get the Stucture Information
  const structure: Structure = setting.pop() as Structure;
  // Get the Primary Key
  const primaryKey = setting.pop();
  // Extracting the Primary key
  const key = primaryKey ? primaryKey : objectKeys(structure).shift();
  // Constructing a Memory Object
  const memory = objectRegistry({
    key,
    // The Structure of the Object
    structure,
    // Constructing Database with Array
    database: arrayDatabase(),
    // The Reference for Quick Access
    reference: {},
  });

  // Return Accessor Function
  return (request?: any) =>
    typeSwitch(request, {
      // Access the Internal Working of the Generator
      function: () =>
        // Request is a Function
        request({
          // Memory Database
          memory,
          // Has Function. Check if it exists
          has: (id: string) => objectHasKey(memory('reference'), id),
          get: (id: string) => memory('reference')[id],
          // Each Loop Function
          each: memory('database').each,
          // Matching For Anything in The Database
          match: memory('database').match,
          // Select Function
          select: (id: string) => selectFunction(memory, id),
          // Insert into Database
          insert: (data: { [key: string]: any }) => insertFunction(memory, data),
          // Update Database Data
          update: (data: { [key: string]: any }) => updateFunction(memory, data),
        }),

      // If it is an array. Inserting Data into the System
      array: () =>
        arrayEach(request, ({ value }: any) => {
          // This will automatically fill the missing data
          insertFunction(memory, value);
        }),

      // If String
      string: () => selectFunction(memory, request),

      // If Object. Add to Database Directly. This is very dangerous!
      object: () => insertFunction(memory, request),

      // Only Default. Return a copy of the Memory
      default: () => [...memory('database')],
    });
};
