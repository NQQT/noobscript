import { MATH } from '../constants/object';

// The Type object
export type ArrayShuffle = <T>(original: T[]) => T[];

// The Shuffle Function
export const arrayShuffle: ArrayShuffle = (original) => {
  // Create a Copy
  const array = original.slice();
  let index = array.length;
  let random;
  while (index !== 0) {
    random = MATH.floor(MATH.random() * index);
    index--;
    // Swapping Random Index
    [array[index], array[random]] = [array[random], array[index]];
  }
  return array;
};
