import { describe, expect, test } from '@jest/globals';
import { objectRegistry } from './registry';

// Testing Object Registry
describe('Testing Object Registry', () => {
  // Creating a standard registry to test
  const registry = objectRegistry();
  test('Basic get and set functionality', () => {
    // Register entry one has the value of "1";
    registry('one', 1);
    registry('two', 2);
    expect(registry('one')).toBe(1);
    expect(registry('two')).toBe(2);
    expect(registry()).toEqual({ one: 1, two: 2 });
  });

  test('Multi Update Functionality. Use Object', () => {
    // Adding One and Two value into Registry. Overwriting previous
    registry({ one: 3, two: 4 });
    // Checking if it is true or not
    expect(registry('one')).toBe(3);
    expect(registry('two')).toBe(4);
    expect(registry()).toEqual({ one: 3, two: 4 });
  });

  test('Using array as key input', () => {
    // Overwriting Registry Object
    registry({ 1: 'one', 2: 'two', 3: 'three', 4: 'four' });
    // Use Array to Multi Select
    expect(registry([1, 2])).toEqual({ 1: 'one', 2: 'two' });
    expect(registry([3, 1])).toEqual({ 3: 'three', 1: 'one' });
  });
});

// Testing Advance Functions, such as Handler
describe('Handler Functions', () => {
  const registry = objectRegistry({
    one: 'apple',
    two: 'banana',
    three: 'plum',
  });

  // This is to test the each handler function
  test('Each Function', () => {
    expect(
      // Expecting the return value to be 0
      registry(({ each }) => {
        // Return the Each Value
        return each(({ key, index }) => {
          // If Key is found, then return the index
          if (key === 'one') return index;
        });
      }),
    ).toBe(0);

    expect(
      // Expecting the return value to be 0
      registry(({ each }) => {
        // Return the Each Value
        return each(({ key, index }) => {
          // If Key is found, then return the index
          if (key === 'three') return index;
        });
      }),
    ).toBe(2);
  });
});
