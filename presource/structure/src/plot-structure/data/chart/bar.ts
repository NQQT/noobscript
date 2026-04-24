import { InputChartDataStructure } from '@presource/structure';
import { objectEach, objectKeys, objectValues } from '@presource/core';

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
            type: 'bar'
        });
    });

    // Returning the result
    return result;
};
