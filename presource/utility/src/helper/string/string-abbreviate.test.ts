import { stringAbbreviate } from '@presource/utility';

describe('String Abbreviation Requirements', () => {
    it('should abbreviate correctly', () => {
        expect(stringAbbreviate('James')).toBe('J');
        expect(stringAbbreviate('Alex Mercer')).toBe('AM');
    });
});
