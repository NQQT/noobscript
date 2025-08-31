import { SPACE } from '../constants/string';

/** Capitalize first letter of every word
 * Note that this does not fix the word itself
 */
export const stringCapitalize = (value: string, letter = 0) => {
  // Get an array of String
  const array = value.split(SPACE).map((entry) => {
    if (!entry) return entry;
    const length = entry.length;
    // If letter is less than 0. Calculate in Reverse
    if (letter < 0) letter += length;
    return entry.slice(0, letter) + entry.charAt(letter).toUpperCase() + entry.slice(letter + 1);
  });
  // return the array of string
  return array.join(SPACE);
};
