import { objectEach } from './each';

/** Similar to Array Filter. This one for Object */
export const objectFilter = <T extends {}>(
  object: T,
  // Triggering the Callback Function
  callback: (args: {
    index: number;
    key: keyof T;
    value: T[keyof T];
    object: T;
    o: T;
    k: keyof T;
    v: T[keyof T];
    i: number;
  }) => any,
) => {
  const result: { [key in keyof T]?: T[keyof T] } = {};
  objectEach(object, (data) => {
    // If Trigger Callback is True. Filter out Function
    if (callback(data)) result[data.k] = data.v;
  });
  // Return Possible Result
  return result;
};
