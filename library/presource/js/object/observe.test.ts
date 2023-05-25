import { describe, expect, test } from '@jest/globals';
import { dataClone } from '../data';
import { objectObserve } from './observe';

describe('Object Observe', () => {
  test('Observation test for primitive', () => {
    const keys: string[] = [];
    const values: string[] = [];
    const source = {};
    const data = objectObserve(source, ({ k, v }) => {
      keys.push(k);
      values.push(v);
    });

    data.fruit = 'apple';
    expect(source).toMatchObject({ fruit: 'apple' });
    expect(keys).toStrictEqual(['fruit']);
    expect(values).toStrictEqual(['apple']);
  });

  test('Observed preloaded data', () => {
    const source = {
      subjects: {
        english: 10,
        math: 12,
      },
    };

    const currentValues: any[] = [];
    const updateValues: any[] = [];
    const data = objectObserve(source, ({ value, current, method }) => {
      if (method === 'set') {
        // Only Set should be looked at
        currentValues.push(current);
        updateValues.push(value);
      }
    });

    data.subjects.english = 20;
    data.subjects.math = 1;

    // The source should be updated correctly
    expect(source).toStrictEqual({ subjects: { english: 20, math: 1 } });
    expect(currentValues).toStrictEqual([10, 12]);
    expect(updateValues).toStrictEqual([20, 1]);
  });

  test('Nested Observation Check', () => {
    const source = {};
    const depths: number[] = [];
    const keys: string[] = [];
    const values: string[] = [];
    const methods: string[] = [];
    const paths: any[] = [];
    let counter = 0;
    const data = objectObserve(source, ({ key, value, depth, method, path }) => {
      console.log('path', path);
      depths.push(depth);
      keys.push(key);
      values.push(dataClone(value));
      methods.push(method);
      paths.push(path);
      counter++;
    });

    data.fruit.apple = 1;
    data.fruit.banana = 2;
    data.fruit.banana++;

    expect(counter).toBe(7);

    // expect(counter).toBe(6);
    expect(source).toMatchObject({ fruit: { apple: 1, banana: 3 } });
    expect(keys).toStrictEqual(['fruit', 'apple', 'fruit', 'banana', 'fruit', 'banana', 'banana']);
    expect(depths).toStrictEqual([0, 1, 0, 1, 0, 1, 1]);
    expect(values).toStrictEqual([
      undefined, // Fruit should be undefined at the start
      1, // Trying to assign 1 to apple
      { apple: 1 }, // Accessing fruit again
      2, // Assigning 2 to banana
      { apple: 1, banana: 2 }, // Accessing fruit again
      2, // getting the value 2
      3, // Setting the value to 3
    ]);

    expect(methods).toStrictEqual(['get', 'set', 'get', 'set', 'get', 'get', 'set']);
    expect(paths).toStrictEqual([
      ['fruit'],
      ['fruit', 'apple'],
      ['fruit'],
      ['fruit', 'banana'],
      ['fruit'],
      ['fruit', 'banana'],
      ['fruit', 'banana'],
    ]);
  });
});
