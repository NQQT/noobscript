import { objectEach } from './each';

/** Updating an Object with Values. This will overwrite */
export const objectUpdate = (object: any, update: any) => {
  // Calling Object Update Algorithm
  objectEach(update, ({ k, v }) => {
    // Update or overwriting values
    object[k] = v;
  });
  return object;
};
