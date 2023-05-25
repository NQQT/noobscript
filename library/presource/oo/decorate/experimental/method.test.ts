import { describe, test, expect } from '@jest/globals';
import { experimentalMethodDecorator } from './method';

describe('Experimental Method Decorator', () => {
  test('Basic logging a method call', () => {
    const log: any[] = [];
    const logger = experimentalMethodDecorator(({ key }) => {
      // Logging the key
      log.push(key);
    });

    class Example {
      @logger()
      calculate() {
        return true;
      }

      // Note that there is no need for passing any argument. Cleaner interface
      @logger
      @logger
      multiple() {
        return false;
      }
    }
    const example = new Example();
    // Calculate to be true
    expect(example.calculate()).toBe(true);
    expect(log).toStrictEqual(['calculate']);

    expect(example.multiple()).toBe(false);
    expect(log).toStrictEqual(['calculate', 'multiple', 'multiple']);
  });

  test('Passing additional arguments', () => {
    // Bulding a method decorator
    const intercept = experimentalMethodDecorator(({ request }) => {
      const requestValue = request[0];
      expect(requestValue).toBe(5);
      return requestValue;
    });

    class Example {
      @intercept(5)
      // To satisfy typescript, must set any
      // Hence, this is all experimental stuff
      calculate(): any {
        // returns nothing
      }
    }

    // When trigger, return the value 5
    expect(new Example().calculate()).toBe(5);
  });

  test('Manipulating the returned value', () => {
    let result: any[] = [];
    const intercept = experimentalMethodDecorator(({ params }) => {
      params.forEach((param) => {
        result.push(param);
      });
      // Overwriting the returned value
      return false;
    });

    const squared = experimentalMethodDecorator(({ evaluate }) => {
      const value = evaluate();
      // Squard the value
      return value * value;
    });

    class Example {
      @intercept check(...args: any[]) {
        // Return the value
        return true;
      }

      @squared valueTwo() {
        return 2;
      }

      // Can stack up the method
      @squared @squared valueThree() {
        return 3;
      }
    }

    const example = new Example();
    expect(example.check()).toBe(false);
    expect(result).toStrictEqual([]);
    example.check(1, 2, 3);
    expect(result).toStrictEqual([1, 2, 3]);
    expect(example.valueTwo()).toBe(4);
    expect(example.valueThree()).toBe(81);
  });
});
