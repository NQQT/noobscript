import { describe, expect, test } from '@jest/globals';
import { isEqual } from '../../../js';
import { experimentalPropertyDecorator } from './property';

describe('Experimental Property Decorator', () => {
  test('Usage as an observer', () => {
    const list: any[] = [];
    // Can create property decorator via decorate property
    const { observe } = experimentalPropertyDecorator({
      // Define the Property Decorators within here
      observe: ({ method, value }) => {
        list.push(value.current);
      },
    });

    class Person {
      @observe age = 18;
      @observe gender = 'male';
    }

    const hero = new Person();
    hero.age = 20;
    // There should be 3 set fields
    expect(list).toStrictEqual([18, 'male', 20]);
    expect(hero.age).toBe(20);
    expect(hero.gender).toBe('male');
    // Added 2 more due to get the get command above
    expect(list).toStrictEqual([18, 'male', 20, 20, 'male']);
  });

  test('Usage as validator of sort', () => {
    const { notNull, size } = experimentalPropertyDecorator({
      notNull: ({ value }) => {},
      size: ({ value, method, request }) => {
        // If Method Get then Return
        method.get(() => {
          return value.current.substring(0, request);
        });
      },
    });

    class Example {
      @notNull @size(5) location: any;
    }

    const place = new Example();
    place.location = 'england';
    expect(place.location).toBe('engla');
  });

  test('Usage as a property mutator', () => {
    // Creating a Decorator Property
    const { prefix, suffix } = experimentalPropertyDecorator({
      prefix: ({ value, method }) => {
        if (isEqual(method.type, 'get')) return '@' + value.current;
      },
      suffix: ({ value, method }) => {
        if (isEqual(method.type, 'get')) return value.current + '!';
      },
    });

    class Example {
      // Adding Multiple
      @prefix @suffix location = 'london';
    }

    const example1 = new Example();
    expect(example1.location).toBe('@london!');

    const example2 = new Example();
    expect(example2.location).toBe('@london!');
    example2.location = 'perth';

    // Difference instance, but same old
    expect(example1.location).toBe('@london!');
    expect(example2.location).toBe('@perth!');
  });

  test('Decorators can be declared partially', () => {
    // Declaring some property decorators
    const { multiply, double } = experimentalPropertyDecorator({
      multiply: ({ value, method }) => {
        if (isEqual(method.type, 'get')) {
          const { current } = value;
          return current * current;
        }
      },
      double: ({ value, method }) => {
        if (isEqual(method.type, 'get')) {
          const { current } = value;
          return current + current;
        }
      },
    });

    // Delaring additional property decorators
    const { addition } = experimentalPropertyDecorator({
      addition: ({ value, method }) => {
        if (isEqual(method.type, 'get')) {
          const { current } = value;
          return current + current;
        }
      },
    });

    class Example {
      // Counter 1 will use decorators from the same declaration
      @multiply @double counter1 = 0;
      // Counter 2 will use decorators from seperate declarations
      @multiply @addition counter2 = 0;
    }

    const example = new Example();
    example.counter1 = 5; // Updating both counter to be the same
    example.counter2 = 5;

    // Counter 1 should be 100, as it has been multiplyied and doubled
    expect(example.counter1).toBe(100);
    // The counter 1 and counter 2 should be the same
    expect(example.counter1).toBe(example.counter2);
  });
});
