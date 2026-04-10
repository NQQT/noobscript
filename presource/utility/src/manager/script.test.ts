import { scriptManager } from './script';
import { loopFor } from '@presource/core';
import { waitFor } from '@testing-library/react';

describe('requirement for script manager', () => {
    it('should execute script in sequence', async () => {
        // Creating a script manager
        const script = scriptManager();

        const animals: string[] = [];

        script(async () => {
            animals.push('dog');
        });
        script(async () => {
            animals.push('cat');
        });

        // Essentially do something else.
        loopFor(100, () => {});

        await waitFor(async () => {
            expect(animals).toStrictEqual(['dog', 'cat']);
        });
    });

    it('should execute script in sequence with conditional', () => {
        // Creating a script manager
        const script = scriptManager();
        const fruits: string[] = [];
        script(async () => {
            fruits.push('apple');
        });

        script(async () => {
            if (!fruits.includes('pear')) return false;
            // Pear should be in the list before pushing banana
            fruits.push('banana');
        });

        script(async () => {
            fruits.push('pear');
        });

        await waitFor(async () => {
            expect(fruits).toStrictEqual(['apple', 'pear', 'banana']);
        });
    });

    it('should execute script in sequence with conditional', () => {
        // Creating a script manager
        const script = scriptManager();
        const queue: string[] = [];
        script(async () => {
            queue.push('John');
        });

        script(async () => {
            if (!queue.includes('Sarah')) return false;
            // James is waiting for Sarah first
            queue.push('James');
        });

        script(async () => {
            queue.push('Sarah');
        });

        script(async () => {
            if (!queue.includes('Tom')) return false;
            // Jack is waiting for his friend, Tom
            queue.push('Jack');
        });

        await waitFor(async () => {
            expect(queue).toStrictEqual(['John', 'James', 'Sarah']);
        });

        // Tom comes later
        script(async () => {
            // Jack is waiting for his friend, Tom
            queue.push('Tom');
        });

        await waitFor(async () => {
            //  The queue is now updated
            expect(queue).toStrictEqual(['John', 'James', 'Sarah', 'Tom', 'Jack']);
        });
    });
});
