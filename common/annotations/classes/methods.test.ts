import { describe, test } from '@jest/globals';
import { abstract } from './methods';

describe('Method Annotations', () => {
  test('if not defined abstract method then error', () => {
    class AbstractClass {
      @abstract
      abstractMethod() {}
    }
    const abstractInstance = new AbstractClass();
    expect(() => abstractInstance.abstractMethod()).toThrowError();
  });
  test('if abstract method is defined then okay', () => {
    class AbstractClass {
      @abstract
      abstractMethod() {}
    }

    class ExtendedClass extends AbstractClass {
      abstractMethod() {
        return 'implemented';
      }
    }

    expect(new ExtendedClass().abstractMethod()).toBe('implemented');
  });
});
