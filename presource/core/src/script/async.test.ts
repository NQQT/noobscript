import { scriptAsync, scriptPause } from '@presource/core';

describe('script async requirement', () => {
    it('should execute every function together', async () => {
        const script = scriptAsync();

        const animals: string[] = [];

        // Appending the function
        script.append(async () => {
            animals.push('cat');
            return true;
        });

        script.append(async () => {
            await scriptPause(10);
            animals.push('dog');
            return true;
        });

        script.append(async () => {
            animals.push('mouse');
            return true;
        });

        // Processing the list
        await script.process();

        // Expecting the result
        expect(animals).toStrictEqual(['cat', 'mouse', 'dog']);
    });

    it('should execute every function until completion', async () => {
        const script = scriptAsync();
        const fruits: string[] = [];

        script.append(async () => {
            fruits.push('apple');
        });

        script.append(async () => {
            // Basically retry later when 'banana' is in the list
            if (!fruits.includes('banana')) return false;
            // Guard clause passes, now we can add pear to the list
            fruits.push('pear');
        });

        // This comes after, and it adds banana to the list
        script.append(async () => {
            fruits.push('banana');
        });

        // Processing the script
        await script.process();

        // Expect this order
        expect(fruits).toStrictEqual(['apple', 'banana', 'pear']);
    });

    it('should execute all tasks in a complex chain of event', async () => {
        const script = scriptAsync();
        const queue: string[] = [];

        script.append(async () => {
            queue.push('John');
        });

        script.append(async () => {
            if (!queue.includes('Jane')) return false;
            // Jack is waiting for Jane to queue first
            queue.push('Jack');
        });

        script.append(async () => {
            if (!queue.includes('Jack')) return false;
            // Tom is waiting for Jack
            queue.push('Tom');
        });

        script.append(async () => {
            if (!queue.includes('Sarah')) return false;
            // Jane is waiting for Sarah
            queue.push('Jane');
        });

        script.append(async () => {
            queue.push('Tina');
        });

        script.append(async () => {
            queue.push('Sarah');
        });

        await script.process();

        // This is the order
        expect(queue).toStrictEqual(['John', 'Tina', 'Sarah', 'Jane', 'Jack', 'Tom']);
    });
});
