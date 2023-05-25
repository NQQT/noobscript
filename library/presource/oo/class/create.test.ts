import { describe, test, expect } from '@jest/globals';
import { classCreate } from './create';

describe('Class Creation', () => {
  test('Creating a class without need for constructor', () => {
    // Creating a Person Class with the following information
    const Person = classCreate({
      name: '',
      gender: 'male',
    });

    // No Argument constructor
    const template = new Person();
    expect(template.name).toBe('');
    expect(template.gender).toBe('male');

    // Creating a New Protagonist with only one field updated
    const protagonist = new Person('james');
    expect(protagonist.name).toBe('james');
    expect(protagonist.gender).toBe('male');

    // Creating a Herione with updated fields
    const herione = new Person('lily', 'female');
    expect(herione.name).toBe('lily');
    expect(herione.gender).toBe('female');
  });

  test('Creating a class with inbuild functions', () => {
    // Creating a Class with Building
    const Building = classCreate({
      wood: 5,
      metal: 9,
      // Can totally use inbuild functions
      total(): number {
        // Return the total
        return this.wood + this.metal;
      },
    });

    // Creating a new Building
    const house = new Building();
    expect(house.wood).toBe(5);
    expect(house.metal).toBe(9);
    expect(house.total()).toBe(14);

    // Updating the variables themselves
    const yatch = new Building(5, 6);
    expect(yatch.wood).toBe(5);
    expect(yatch.metal).toBe(6);
    expect(yatch.total()).toBe(11);

    // Overwriting functions
    const barn = new Building(2, 2, () => 5);
    expect(barn.wood).toBe(2);
    expect(barn.metal).toBe(2);
    expect(barn.total()).toBe(5);
  });
});
