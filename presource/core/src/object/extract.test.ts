import { objectExtract } from '@presource/core';

describe('objectExtract test and requirements', () => {
    // Creating an example to test
    const example = {
        fruits: { apple: { color: 'red', quality: 1 }, banana: { color: 'yellow', quality: 1 } },
        animals: { cat: { color: 'brown', quality: 2 }, dog: { color: 'black', quality: 2 } },
        lists: {
            fruits: ['apple', 'banana', 'pear'],
            animals: ['cat', 'dog', 'elephant'],
            nested: [
                {
                    parents: ['John', 'Jane']
                }
            ]
        }
    };

    test('should able to access through simple string path', () => {
        expect(objectExtract(example, 'fruits.apple')).toStrictEqual({ color: 'red', quality: 1 });
        expect(objectExtract(example, 'fruits.apple.color')).toStrictEqual('red');
        expect(objectExtract(example, 'fruits.apple.color.red')).toBeUndefined();
    });

    test('should returns an array when array is requested', () => {
        expect(objectExtract(example, ['fruits.apple.color', 'animals.cat.color'])).toStrictEqual(['red', 'brown']);
    });

    // TODO This requirement is not met
    test('should access array when array key is provided', () => {
        // Accessing with array indexes
        expect(objectExtract(example, 'lists.fruits[0]')).toStrictEqual('apple');
        //  Access the d
        expect(objectExtract(example, 'lists.nested[0]')).toStrictEqual({
            parents: ['John', 'Jane']
        });
        expect(objectExtract(example, 'lists.nested[0].parents[0]')).toStrictEqual('John');
    });
});
