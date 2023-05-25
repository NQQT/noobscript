import { describe, test, expect } from '@jest/globals';
import { GettersInterface, LombokGettersDecorator } from './getters';

describe('Lombok Getters Implements Function', () => {
  const Getters = LombokGettersDecorator();

  test('Basic Object Constructor', () => {
    @Getters()
    class Person {
      gender: string;
      height: string;

      constructor() {
        this.gender = 'male';
        this.height = 'hello';
      }
    }

    // Design for Typescript Interface Locking
    const james: GettersInterface<typeof Person> = new Person() as any;

    expect(james.getGender()).toBe('male');
  });
});
