import { plotBarChartData } from '@presource/structure';

describe('standardized bar plot data', () => {
    // Sample
    const sample = { fruit: { apple: 1, banana: 2 } };

    it('should convert to standard bar plot data', () => {
        // Expecting the input equal to output
        expect(plotBarChartData(sample)).toStrictEqual([
            { name: 'fruit', type: 'bar', x: ['apple', 'banana'], y: [1, 2] }
        ]);
    });
});
