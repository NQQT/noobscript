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
});
