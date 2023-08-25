import { describe, expect, test } from '@jest/globals';
import { LombokGettersDecorator } from '../lombok/getters';
import { classConstructor } from './constructor';

describe('Class Constructor', () => {
  test('Creating a class from an instance', () => {
    // Creating an annonymous class
    const example = new (class A {
      name = 'john';
      gender = 'male';
    })();

    expect(example.name).toBe('john');
    expect(example.gender).toBe('male');

    const Getters = LombokGettersDecorator();

    const test = classConstructor(
      class {
        name = 'john';
        gender = 'male';
      },
    );

    const copy = new (classConstructor(example))();

    expect(copy.name).toBe('john');
    expect(copy.gender).toBe('male');
  });
});
