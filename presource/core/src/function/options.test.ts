import { functionOptions } from '@presource/core';

describe('functionOptions requirements', () => {
    // TS7022: example implicitly has type any because it does not have a type annotation and is referenced directly or indirectly in its own initializer.
    const example = functionOptions({
        get: async () => 'hello',
        // TS7023: world implicitly has return type any because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
        world: async () => {
            // TS7022: value implicitly has type any because it does not have a type annotation and is referenced directly or indirectly in its own initializer.
            const value: string = await example.get();
            return `${value} world`;
        }
    });

    beforeEach(() => {
        example().reset();
    });

    it('should be able to execute methods correctly', async () => {
        expect(await example.get()).toBe('hello');
        expect(await example.world()).toBe('hello world');
    });
});
