import React from 'react';
import { act, render } from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import { createReactContextTree } from '../..';

describe('Testing Tree reactive hook within context', () => {
  // This is how you create a Tree Context
  const { reactive: useContextState, provider: ContextProvider } = createReactContextTree(React);

  test('Checking Basic usage of reactive hook', () => {
    // The number of rendered been recorded
    let renderedCount = 0;
    let reactive: any;
    const Sample = React.memo(() => {
      renderedCount++;
      reactive = useContextState();
      return null;
    });

    // rendering the sample
    render(
      <ContextProvider>
        <Sample />
      </ContextProvider>,
    );

    // Expect the Current Context Ref to be Equal to 0
    expect(renderedCount).toBe(1);
    expect(reactive()).toStrictEqual({});

    // Updating The Render
    act(() => {
      // Updating Current
      reactive({ a: 1 });
    });
    // No rendered get triggered because it uses reference
    expect(renderedCount).toBe(2);
    // Updating the Data
    expect(reactive()).toStrictEqual({ a: 1 });
  });

  test('Usage of multiple controls of reactive hook', () => {
    // Setting up General Animals
    let animalCount = 0;
    let animals: any;
    const Animals = React.memo(() => {
      // Each Time This Rendered. Trigger the Animal Count
      animalCount++;
      animals = useContextState();
      return null;
    });

    // Setting up Cat
    let catCount = 0;
    let cat: any;
    const Cat = React.memo(() => {
      // Each Time This Rendered. Trigger the Animal Count
      catCount++;
      cat = useContextState('cat');
      return null;
    });

    // Setting up Dog
    let dogCount = 0;
    let dog: any;
    const Dog = React.memo(() => {
      // Each Time This Rendered. Trigger the Animal Count
      dogCount++;
      dog = useContextState('dog');
      return null;
    });

    render(
      <ContextProvider>
        <Animals />
        <Cat />
        <Dog />
      </ContextProvider>,
    );

    // Render Count
    expect(animalCount).toBe(1);
    expect(catCount).toBe(1);
    expect(dogCount).toBe(1);
    // Value count
    expect(animals()).toStrictEqual({});
    expect(cat()).toBeUndefined();
    expect(dog()).toBeUndefined();

    // Let name the cat
    act(() => {
      cat('apple');
    });
    // Animal Component will also get re-rendered
    expect(animalCount).toBe(2);
    // Expecting cat to be re-rendered once.
    expect(catCount).toBe(2);
    expect(dogCount).toBe(1);
    // Expectation of values
    expect(animals()).toStrictEqual({ cat: 'apple' });
    expect(cat()).toBe('apple');
    expect(dog()).toBeUndefined();

    act(() => {
      dog('banana');
    });
    // Animal Component will also get re-rendered
    expect(animalCount).toBe(3);
    expect(catCount).toBe(2);
    // Expecting dog to be re-rendered once.
    expect(dogCount).toBe(2);
    // Expectation of values
    expect(animals()).toStrictEqual({ cat: 'apple', dog: 'banana' });
    expect(cat()).toBe('apple');
    expect(dog()).toBe('banana');

    // using animal to updates specifc animals
    act(() => {
      // Updating animal data
      animals({ cat: 'banana', dog: 'apple' });
    });

    // Checking renderer count
    expect(animalCount).toBe(4);
    expect(catCount).toBe(3);
    expect(dogCount).toBe(3);
    // Expecting the values
    expect(animals()).toStrictEqual({ cat: 'banana', dog: 'apple' });
    expect(cat()).toBe('banana');
    expect(dog()).toBe('apple');

    // Using master to update a specific item
    act(() => {
      // Updating cat data
      animals({ cat: 'apple' });
    });

    // Checking renderer count
    expect(animalCount).toBe(5);
    expect(catCount).toBe(4);
    expect(dogCount).toBe(3); // This should not have changed as no data has been sent
    // Expecting the values
    expect(animals()).toStrictEqual({ cat: 'apple', dog: 'apple' });
    expect(cat()).toBe('apple');
    expect(dog()).toBe('apple');
  });
});

describe('Complex reactive functionality', () => {
  // This is how you create a Tree Context
  const { reactive: useContextState, provider: ContextProvider } = createReactContextTree(React);

  let subjects: any;
  let math: any;
  let english: any;

  let subjectCount = 0;
  let mathCount = 0;
  let englishCount = 0;
  // Let's create some example components
  const Subjects = React.memo(() => {
    subjectCount++;
    subjects = useContextState();
    return null;
  });

  const Math = React.memo(() => {
    mathCount++;
    math = useContextState('math');
    return null;
  });

  const English = React.memo(() => {
    englishCount++;
    english = useContextState('english');
    return null;
  });

  test('nested reactive hooks', () => {
    render(
      <ContextProvider>
        <Subjects />
        <Math />
        <ContextProvider>
          <English />
        </ContextProvider>
      </ContextProvider>,
    );

    // Initial State. Counter
    expect(subjectCount).toBe(1);
    expect(mathCount).toBe(1);
    expect(englishCount).toBe(1);
    // Values
    expect(subjects()).toStrictEqual({});
    expect(math()).toBeUndefined();
    expect(english()).toBeUndefined();

    act(() => {
      // Updating Math
      math(12);
    });

    // Initial State. Counter
    expect(subjectCount).toBe(2);
    expect(mathCount).toBe(2);
    expect(englishCount).toBe(1);
    // Values
    expect(subjects()).toStrictEqual({ math: 12 });
    expect(math()).toBe(12);
    expect(english()).toBeUndefined();
  });
});
