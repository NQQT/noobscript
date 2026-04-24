import { treeDatabase } from '@presource/utility';

describe('Tree Database - Export Function', () => {
    test('Testing Export Function', () => {
        const db = treeDatabase(5);
        // Basic Export Function. By Default, Export Object
        expect(db.export()).toStrictEqual({ data: 5 });
        // Exporting String via Handler Controls
        expect(db.export(({ string }) => string())).toBe('{"data":5}');
    });
});
