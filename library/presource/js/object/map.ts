import { objectEach } from './each';

type Argument<T> = {
  object: T;
  value: T[keyof T];
  key: keyof T;
  index: number;
  o: T;
  v: T[keyof T];
  k: keyof T;
  i: number;
};

/** Similiar to Array.map function */
export const objectMap = <T extends {}, V>(
  // The Object Item
  object: T,
  // The Apply Callback Function
  callback: (args: Argument<T>) => V,
) => {
  // Constructing the Return result
  const result: any = {};

  // Looping Through Each Object
  objectEach(object, (data) => {
    // Extracting Key out of Data
    const { key } = data;
    // Setting Callback Result to Key
    result[key] = callback(data);
  });
  // Returning the Result Information
  return result as { [key in keyof T]: V };
};

// Mapping Object Keys
export const objectMapKeys = <T extends {}, V extends string>(
  // The Object Item
  object: T,
  // The Apply Callback Function
  callback: (args: Argument<T>) => V,
) => {
  // The Resulting Object
  const result: any = {};

  objectEach(object, (data) => {
    // Extracting Key Data
    const { k, v } = data;
    // Updating the Result
    result[callback(data) ?? k] = v;
  });
  // Return the Result
  return result as { [key in V]: T[keyof T] };
};
