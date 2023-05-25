import { describe, test, expect } from '@jest/globals';
import { ObjectFreeze } from './freeze';

describe('Object Freeze Type', () => {
  // Standard usage
  test('Using function to impart type', () => {
    const example = {
      family: {
        mother: 'jane',
        father: 'john',
        siblings: {
          brother: 'jack',
          sister: 'jill',
        },
      },
    };
    type Example = typeof example;
    const familyTree: ObjectFreeze<Example> = example;

    expect(familyTree.family.mother).toBe('jane');
    expect(familyTree.family.siblings).toMatchObject({
      brother: 'jack',
      sister: 'jill',
    });
  });
});
