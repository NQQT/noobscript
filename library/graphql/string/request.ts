import { objectEach, typeSwitch, objectKeys } from '@library/presource';

type Data = { [key: string]: Data };
type Structure = (data: Data) => string;

/** Return a proper response request */
export const createGraphQLRequestString: Structure = (data) => {
  const result: any[] = ['{'];
  // Scanning through each object
  objectEach(data, ({ v, k }) => {
    // Adding to result array
    result.push(k);
    // Scanning through the type
    typeSwitch(v, {
      // Checking for nested object
      object: () => {
        if (objectKeys(v).length) {
          // Only continue if object is valid
          result.push(createGraphQLRequestString(v));
        }
      },
    });
  });
  result.push('}');
  return result.join(' ');
};
