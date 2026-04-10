import { functionControl } from '@presource/core';

describe('functionControl requirements', () => {
    it('should able to create a controlling object', () => {
        const availableFruits = {
            apple: () => 'apple',
            banana: () => 'banana'
        };

        // Building a controlling fruit object
        const fruits = functionControl(({ key }) => {
            // Return the value or return serror
            return (availableFruits as any)[key] || (() => 'error');
        });

        // Expecting calling apple to return apple
        expect(fruits.apple()).toBe('apple');
        expect(fruits.banana()).toBe('banana');
        expect(fruits.orange()).toBe('error');
    });
});
