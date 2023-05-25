import { describe, test, expect } from '@jest/globals';
import { mockDatabase } from '.';

describe('Testing mockDatabase', () => {
  test('Simple Inserting and Retrieving', () => {
    // Creating Simple Database
    const database = mockDatabase('id', {
      name: () => 'test',
    });
    expect(database('1')).toStrictEqual({ id: '1', name: 'test' });
    database('2');
    database('3');
    database('4');

    // The Stored Data
    const data = [
      { id: '1', name: 'test' },
      { id: '2', name: 'test' },
      { id: '3', name: 'test' },
      { id: '4', name: 'test' },
    ];

    // Accessing Entire Database
    expect(database()).toStrictEqual(data);

    // You cannot insert into database without primary key!
    expect(database({ name: 'fail' })).toBeUndefined();
    // You cannot overwrite database with insertion
    expect(database({ id: '4', name: 'overwrite' })).toBeUndefined();

    // Database Has Not Changed!
    expect(database()).toStrictEqual(data);

    database({
      id: '5',
      name: 'insert',
    });
    // Direct Insert Check
    expect(database('5')).toStrictEqual({ id: '5', name: 'insert' });
  });

  // More Advance Cases
  test('Advance Inserting and Retrieving Database Information', () => {
    const database = mockDatabase('id', {
      name: ({ id }) => 'item' + id,
    });

    expect(database('1')).toStrictEqual({ id: '1', name: 'item1' });
    database({ id: '12' });
    // This is Due to Insertion. Missing name.
    expect(database('12')).toStrictEqual({ id: '12' });

    // Expecting Returning Data
    expect(database(({ select }: any) => select('1'))).toStrictEqual({ id: '1', name: 'item1' });
  });

  test('Simple way to chain multiple database together', () => {
    // Creating a mockdatabase for wheels
    const wheels = mockDatabase('id', {
      name: ({ id }) => {
        const { window } = cars(id);
        return window;
      },
    });

    // Creating a mockdatabase for cars
    const cars = mockDatabase('id', {
      name: () => 'name',
      window: () => 'glass',
      wheels: ({ id }) => {
        return wheels(id);
      },
    });

    // Let create mazda
    expect(cars('mazda')).toStrictEqual({
      id: 'mazda',
      name: 'name',
      window: 'glass',
      wheels: { id: 'mazda', name: 'glass' },
    });
  });
});
