import { objectUpdate } from './update';

describe('Object Update', () => {
  test('able to merge objects together', () => {
    const fruits = { apple: 1, banana: 2 };
    const animals = { cat: 3, dog: 4 };

    objectUpdate(fruits, animals);

    expect(fruits).toMatchObject({
      apple: 1,
      banana: 2,
      cat: 3,
      dog: 4,
    });
  });
});
