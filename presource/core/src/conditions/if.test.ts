import { ifFalse, ifTrue } from '@presource/core';

describe('If Condition Test', () => {
    test('Condition is true', () => {
        expect(ifTrue(true, () => 'test')).toBe('test');
        expect(ifFalse(true, () => 'test')).toBeUndefined();
    });
});
