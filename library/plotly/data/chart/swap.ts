import { objectEach } from '@library/presource/js/object/each';

/** The Data Structure */
export type InputChartDataStructure = {
  [key: string]: { [key: string]: number };
};

/** Restacking Data if required */
export const plotlySwapInputChartData = (data: InputChartDataStructure) => {
  const result: InputChartDataStructure = {};
  objectEach(data, ({ k, v }) => {
    objectEach(v, ({ k: nestedKey, v: nestedValue }) => {
      const nested = result[nestedKey] || {};

      nested[k] = (nested[k] || 0) + nestedValue;
      // Updating the Nested Key
      result[nestedKey] = nested;
    });
  });

  // Returning the result
  return result;
};
