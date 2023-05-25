import { objectEach } from './each';

type Item = { [key: string]: any };
type Structure = (input: Item) => Item;

/** To resolve all the function within the object */
export const objectResolve: Structure = (data) => {
  const result: Item = {};

  const resolveValue = (key: string, value: any) => {
    // Resolve function
    return key;
  };

  objectEach(data, ({ k, v }: any) => {
    // Calling the resolve function
    resolveValue(k, v);
  });

  return result;
};
