import { describe, test, expect } from '@jest/globals';
import { dataList } from './list';

describe('Data List', () => {
  test('Simple List object creation and property access', () => {
    const source = {};
    // For Testing
    const keys: string[] = [];
    const values: string[] = [];
    const observe = (args: any) => {
      const { key, value } = args;
      // Record the value for matching
      keys.push(key);
      values.push(value);
    };

    // The Standard Structure
    const structure = {
      family: {
        mother: observe,
        father: observe,
      },
      relative: {
        uncle: observe,
        aunty: observe,
      },
    };

    // Creating a List
    const list = dataList(source, structure);
    list.naruto.family.mother = 'kushina';
    expect(list()).toBe(source);
    expect(source).toMatchObject({ naruto: { family: { mother: 'kushina' } } });
    expect(keys).toStrictEqual(['naruto.family.mother']);
  });

  test('Basic handler function access, getting source list', () => {});

  test('Multi update via setting object data', () => {
    const source = {};
    const keys: string[] = [];
    const values: string[] = [];

    // The Observe function to see what is being triggered
    const observe = (args: any) => {
      const { key, value } = args;
      keys.push(key);
      values.push(value);
    };

    // Data Information
    const data = dataList(source, {
      biography: {
        age: observe,
        gender: observe,
      },
    });

    // Single access
    data.jane.biography.age = 20;
    data.jane.biography.gender = 'female';
    // Setting it like so
    data.john.biography = { age: 10, gender: 'male' };

    data.bob = {
      biography: {
        age: 50,
        gender: 'none',
      },
    };

    expect(source).toMatchObject({
      jane: {
        biography: { age: 20, gender: 'female' },
      },
      john: {
        biography: { age: 10, gender: 'male' },
      },
      bob: {
        biography: {
          age: 50,
          gender: 'none',
        },
      },
    });

    expect(keys).toStrictEqual([
      'jane.biography.age',
      'jane.biography.gender',
      'john.biography.age',
      'john.biography.gender',
      'bob.biography.age',
      'bob.biography.gender',
    ]);

    expect(values).toStrictEqual([20, 'female', 10, 'male', 50, 'none']);
  });
});
