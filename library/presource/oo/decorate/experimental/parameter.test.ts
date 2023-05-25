import { describe, expect, test } from '@jest/globals';
import { experimentalParameterDecorator } from './parameter';

describe('Experimental Parameter Decorators', () => {
  // This is example of how to use a parameter decorators
  // Note that parameter decorator usually for adding meta data, but through method decorator
  // it can do alot more.

  test('Using to log parameters', () => {
    // Storing into list
    const list: any[] = [];
    // Building the method decorator factory
    const logger = experimentalParameterDecorator({
      // Adding value into the list
      log: ({ value }) => {
        list.push(value);
      },
    });
    // Extracting out the params decorator
    const { log } = logger;

    class Example {
      // Add the method decorator
      @logger()
      save(@log value: any) {
        return value;
      }
    }
    // Create an instance
    const example = new Example();

    // No Change to the value, as only logging
    expect(example.save('apple')).toBe('apple');
    // The value has been logged
    expect(list).toStrictEqual(['apple']);
  });

  test('Using it to modify parameters', () => {
    // Parameter decorator can be used to modify the parameters
    // This is very useful to create clean code logic

    // Let create a calculation value
    const calculation = experimentalParameterDecorator({
      // Double up the value, returning it as a string
      double: ({ value }) => (2 * +value).toString(),
      triple: ({ value }) => (3 * +value).toString(),
      inverse: ({ value }) => (-1 * +value).toString(),
      add5: ({ value }) => (+value + 5).toString(),
    });

    const { double, triple, inverse, add5 } = calculation;

    // Let's create a calculator class with just a single check function
    class Calculator {
      @calculation()
      double(@double value: string) {
        return value;
      }

      @calculation()
      triple(@triple value: string) {
        return value;
      }

      @calculation()
      inverse(@inverse value: string) {
        return value;
      }

      @calculation()
      doubleInverse(@inverse @inverse value: string) {
        return value;
      }

      @calculation()
      add5(@add5 value: string) {
        return value;
      }

      @calculation()
      tripleAdd5(@add5 @add5 @add5 value: string) {
        return value;
      }

      @calculation()
      doubleThenAdd5(@add5 @double value: string) {
        return value;
      }

      @calculation()
      add5ThenDouble(@double @add5 value: string) {
        return value;
      }
    }

    // Creating a new instance
    const instance = new Calculator();

    expect(instance.double('8')).toBe('16');
    expect(instance.triple('4')).toBe('12');
    expect(instance.inverse('8')).toBe('-8');
    expect(instance.add5('1')).toBe('6');

    // Can double up and so on
    expect(instance.doubleInverse('8')).toBe('8');
    expect(instance.tripleAdd5('2')).toBe('17');
    // Multiple. Checking order
    expect(instance.doubleThenAdd5('4')).toBe('13');
    expect(instance.add5ThenDouble('7')).toBe('24');
  });

  test('Multiple declaration should work', () => {
    // Let create a calculation value
    const calculation = experimentalParameterDecorator({
      // Double up the value, returning it as a string
      double: ({ value }) => (2 * +value).toString(),
      triple: ({ value }) => (3 * +value).toString(),
    });

    // Extracting the parameter decorator (annotations)
    const { double, triple } = calculation;

    const { inverse, add5 } = experimentalParameterDecorator({
      // Annotations
      inverse: ({ value }) => (-1 * +value).toString(),
      add5: ({ value }) => (+value + 5).toString(),
    });

    // Let's create a calculator class with just a single check function
    class Calculator {
      @calculation()
      double(@double value: string) {
        // Calculation is done through annotation instead
        return value;
      }

      @calculation()
      triple(@triple value: string) {
        // Calculation is done through annotation instead
        return value;
      }

      @calculation()
      inverse(@inverse value: string) {
        // Calculation is done through annotation instead
        return value;
      }

      @calculation()
      add5(@add5 value: string) {
        // Calculation is done through annotation instead
        return value;
      }

      @calculation()
      doubleThenAdd5(@add5 @double value: string) {
        // Calculation is done through annotation instead
        return value;
      }

      @calculation()
      add5ThenDouble(@double @add5 value: string) {
        // Calculation is done through annotation instead
        return value;
      }
    }

    // Creating a new instance
    const instance = new Calculator();

    expect(instance.double('5')).toBe('10');
    expect(instance.triple('3')).toBe('9');
    expect(instance.inverse('8')).toBe('-8');
    expect(instance.add5('1')).toBe('6');
    // Multiple. Checking order
    expect(instance.doubleThenAdd5('4')).toBe('13');
    expect(instance.add5ThenDouble('7')).toBe('24');
  });
});
