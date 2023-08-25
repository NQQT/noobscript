import { InputChartDataStructure } from './swap';
import { objectEach } from '@library/presource/js/object/each';
import { objectValues } from '@library/presource/js/object/values';
import { objectKeys } from '@library/presource/js/object/keys';

export type BarChartDataStructure = {
  type: string;
  name: string;
  x: string[];
  y: number[];
}[];

/** Standard plotly data bar char conversion */
export const plotBarChartData = (data: InputChartDataStructure) => {
  const result: BarChartDataStructure = [];

  // Scanning through each object
  objectEach(data, ({ k, v }) => {
    // Constructing the Bar Plot
    result.push({
      y: objectValues(v),
      x: objectKeys(v),
      name: k as string,
      type: 'bar',
    });
  });

  // Returning the result
  return result;
};
