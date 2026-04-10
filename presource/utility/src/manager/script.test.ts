import { scriptManager } from '@presource/utility';
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

    it('should execute script in sequence with conditional', async () => {
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

    it('should execute script in sequence with conditional', async () => {
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
            expect(queue).toStrictEqual(['John', 'Sarah', 'James']);
        });

        // Tom comes later
        script(async () => {
            // Jack is waiting for his friend, Tom
            queue.push('Tom');
        });

        await waitFor(async () => {
            //  The queue is now updated
            expect(queue).toStrictEqual(['John', 'Sarah', 'James', 'Tom', 'Jack']);
        });
    });

    it('should also execute when external interference happens', async () => {
        const script = scriptManager();

        const tasks: string[] = [];
        script(async () => {
            tasks.push('Cleaning');
        });

        script(async () => {
            tasks.push('Groceries');
        });

        script(async () => {
            if (!tasks.includes('Bank')) return false;
            // Can't repair things if haven't gone to the bank.
            tasks.push('Repair');
        });

        await waitFor(async () => {
            expect(tasks).toStrictEqual(['Cleaning', 'Groceries']);
        });

        // Essentially do something else.
        loopFor(100, () => {});

        // External task. Someone else went to the bank instead
        tasks.push('Bank');

        // Essentially do something else.
        loopFor(100, () => {});

        await waitFor(async () => {
            // Repair also happens, since script is constantly running in background, retrying task that has failed.
            expect(tasks).toStrictEqual(['Cleaning', 'Groceries', 'Bank', 'Repair']);
        });
    });
});
