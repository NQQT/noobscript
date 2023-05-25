import { describe, test, expect } from '@jest/globals';
import { arrayDatabase } from '.';

describe('Array Database', () => {
  // Creating a new database
  const database = arrayDatabase();

  test('Behave like an array', () => {
    // Must be an instance of Array
    expect(database).toBeInstanceOf(Array);
    // Its length must be 0
    expect(database.length).toBe(0);
  });

  test('Push, Pop, Shift, Unshift', () => {
    database.push({ value: 1 });
    database.push({ value: 2 });
    database.push({ value: 3 });
    database.push({ value: 4 });
    database.push({ value: 5 });

    expect(database.length).toBe(5);
    expect(database.pop()).toStrictEqual({ value: 5 });
    expect(database.length).toBe(4);

    expect(database.shift()).toStrictEqual({ value: 1 });
    database.unshift({ value: 1 });
    database.push({ value: 5 });

    // Return Database to Original State
    expect(JSON.stringify(database)).toStrictEqual(
      JSON.stringify([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }]),
    );
  });
});
