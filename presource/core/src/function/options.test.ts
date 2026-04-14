import { functionOptions } from '@presource/core';

describe('functionOptions requirements', () => {
    // TS7022: example implicitly has type any because it does not have a type annotation and is referenced directly or indirectly in its own initializer.
    const example = functionOptions({
        get: async () => 'hello',
        // TS7023: world implicitly has return type any because it does not have a return type annotation and is referenced directly or indirectly in one of its return expressions.
        world: async () => {
            // TS7022: value implicitly has type any because it does not have a type annotation and is referenced directly or indirectly in its own initializer.
            const value: string = await example.get();
            return `${value} world!`;
        }
    });

    beforeEach(() => {
        example().reset();
    });

    it('should be able to execute methods correctly', async () => {
        expect(await example.get()).toBe('hello');
        expect(await example.world()).toBe('hello world!');
    });

    it('should be able to update the original methods', async () => {
        example().update({
            get: async () => 'goodbye'
        });

        expect(await example.get()).toBe('goodbye');
        expect(await example.world()).toBe('goodbye world!');
    });

    it('should be allowed to be extendable with newer method', async () => {
        // Function Options allows extending previous configured options
        const extendedExample = example({
            type: async () => 'human'
        });

        expect(await extendedExample.get()).toBe('hello');
        expect(await extendedExample.world()).toBe('hello world!');
        expect(await extendedExample.type()).toBe('human');

        // You can extend it further
        const futherExtended = extendedExample({
            planet: async () => true
        });

        expect(await futherExtended.get()).toBe('hello');
        expect(await futherExtended.world()).toBe('hello world!');
        expect(await futherExtended.type()).toBe('human');
        expect(await futherExtended.planet()).toBe(true);
    });
});
