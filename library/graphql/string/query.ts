import { objectEach, objectKeys, typeSwitch } from '@library/presource';
import { createGraphQLRequestString } from './request';
import { createGraphQLVariableString } from './variable';

type Query = { [key: string]: any };

/* For converting object to graphQL string */
export const createGraphQLQueryString = (query: Query) => {
  // The data structure
  const data: any = {};

  objectEach(query, ({ key, value }) => {
    // Get a new key and new value from the recursive loop
    const [newKey, newValue] = recursiveLoop(key as string, value);
    // Updating data with those values
    data[newKey] = newValue;
  });

  // Returning the data payload
  return createGraphQLRequestString(data);
};

const recursiveLoop = (key: string, value: any) => {
  typeSwitch(value, {
    // Process further if it is an object format
    object: () => {
      const newKeyList: any = {};
      const newValue: any = {};

      // Scanning through
      objectEach(value, ({ k, v }) => {
        typeSwitch(v, {
          object: () => {
            // Get the nested key and nested value
            const [nestedKey, nestedValue] = recursiveLoop(k as string, v);
            newValue[nestedKey] = nestedValue;
          },
          default: () => {
            // For everything else
            newKeyList[k] = v;
            // Also include it in the list
            newValue[k] = {};
          },
        });
      });

      if (objectKeys(newKeyList).length) {
        // Adding variable listing
        key += createGraphQLVariableString(newKeyList);
      }
      // Overwriting Old value
      value = newValue;
    },
  });

  // Returning the key and value
  return [key, value];
};
