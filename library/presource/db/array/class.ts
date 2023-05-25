import { matchFunction } from './functions/match';
import { eachFunction } from './functions/each';
import { arrayDatabase } from '.';

// Array Database is an extension of an Array, so you have access to all array functions
export class ArrayDatabase extends Array {
  // Setting up the Constructor
  constructor(...initialValue: any[]) {
    super(...initialValue);
  }
  // For Cloning an Array
  clone = (array: any[] = this) => arrayDatabase(array);
  /** For Scanning Through Each of the Entry. */
  each = (callback: Parameters<typeof eachFunction>[1]) => eachFunction(this, callback);
  // Match Functionality
  match = (matcher: Parameters<typeof matchFunction>[1]) => matchFunction(this, matcher);
}
