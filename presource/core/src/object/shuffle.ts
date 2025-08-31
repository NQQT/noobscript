import { arrayShuffle } from '../array/shuffle';
import { objectKeys } from './keys';

// For Shuffling an Object
export const objectShuffle = (object: { [key: string]: any }) => {
  // Get the Keys Information
  const keys = objectKeys(object);

  const result: any = {};
  arrayShuffle(keys).map((key) => {
    // Reshuffling Key
    result[key] = object[key];
  });

  // Returning the Result
  return result;
};
