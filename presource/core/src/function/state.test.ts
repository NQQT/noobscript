import { describe, expect } from '@jest/globals';
import { functionState } from '@presource/core';

describe('Funtion State Test - Design for Reactivity', () => {
  it('can be used reactively', () => {
    // Creating a new function group
    const state = functionState();

    // Setting The Initial State. Each item will get an amount of 0.
    const apple = state(0);
    const banana = state(0);

    // Testing whether Fruit get rendered or not
    let totalFruits = 0;
    let counter = 0;

    // Reactive State
    const fruits = state(() => {
      // Number of Refresh
      counter++;
      // Chaining Condition. If Apple or Banana is triggered.
      // fruits will be triggered
      const total = apple() + banana();

      // Expecting the Total to be
      expect(total).toBe(totalFruits);
      // Should return something to the body. So fruit is the sum of apple and banana.
      return total;
    });

    // Fruit will be rendered once
    expect(counter).toBe(1);

    // Reactive State
    state(() => {
      fruits();
    });

    // Fruit has been rendered again
    expect(counter).toBe(2);

    totalFruits = 5;
    // Setting Apple to be 5.
    apple(5);

    // Fruit Got Refreshed
    expect(counter).toBe(4);

    totalFruits = 7;
    banana(2);
    // Expecting Fruits to be triggered
  });

  it('can be used to update an external object like a scoreboard of sort', () => {
    // Let's create a score board of sort
    const scoreboard: any = {};
    // Building a new state function.
    const state = functionState();

    // Number of student taking classes. Let all put them as 0 for now.
    const english = state(0);
    const math = state(0);
    const chemistry = state(0);
    const physic = state(0);

    // Creating a linking state.
    state(() => {
      // Updating the Scoreboard with number of students
      scoreboard.students = english() + math() + chemistry() + physic();
    });

    // Initial Scoreboard
    expect(scoreboard).toStrictEqual({ students: 0 });
    // 12 student is now taking english.
    english(12);
    // Expecting scoreboard to have 12 students in total.
    expect(scoreboard).toStrictEqual({ students: 12 });
    // Adding more students taking classes
    math(10);
    chemistry(20);
    // Expecting score board be updated.
    expect(scoreboard).toStrictEqual({ students: 42 });
  });

  it('can be used as custom sub state', () => {
    // Creating a new function data
    const state = functionState();

    const strength = state(0);
    const magic = state(0);

    const power = state(() => {
      return strength() + magic();
    });

    expect(power()).toBe(0);
    strength(10);
    expect(power()).toBe(10);

    const attack = () => power() + 10;
    const defense = state(() => {
      return attack() + 5;
    });

    expect(defense()).toBe(25);
    expect(attack()).toBe(20);
  });

  // test('Async data', () => {
  //   // Creating a Function State
  //   const data = functionState();

  //   // Cats and dogs
  //   const cats = data(10);
  //   const dogs = data(10);

  //   const pets = data(async () => {
  //     // Returning the cats and dogs
  //     return cats() + dogs();
  //   });

  //   const owners = data(async () => {
  //     // Await for the count
  //     const count = await pets();
  //     expect(count).toBe(20);
  //   });
  // });
});
