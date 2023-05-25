import { describe, test, expect } from '@jest/globals';
import { arrayEach, objectConstant, stringCapitalize } from '../../../js';
import { experimentalClassDecorator } from './class';

describe('Experimental Class Decorator', () => {
  test('Logging Class Creation', () => {});

  test('Adding new function to class prototype', () => {
    const getter = experimentalClassDecorator(({ keys, constructor, meta, define }) => {
      const metaData = meta('id');
      const obj = objectConstant();
      //   console.log(constructor);
      //   constructor = new constructor();
      //   console.log(constructor);
      //   console.log('keys', obj.keys(constructor));
      //   console.log('Property', obj.getOwnPropertyNames(constructor));
      //   console.log('Descriptors', obj.getOwnPropertyDescriptors(constructor));
      //   console.log('Reflect', Reflect.ownKeys(constructor));

      define(({ self, value }) => {
        return {
          value() {
            return self[value];
          },
          writable: true,
          enumrable: false,
        };
      });

      console.log('key', keys());

      const newProperties: any = {};
      arrayEach(keys(), ({ value }) => {
        newProperties['get' + stringCapitalize(value)] = {
          value() {
            console.log(this);
            return (this as any)[value];
          },
          writable: true,
          enumerable: false,
        };
      });

      define(newProperties);

      // Creating a New Mapped Constructor
      //   return class extends constructor {
      //     constructor(...args: any) {
      //       super(args);

      //       const keys = Reflect.ownKeys(this);
      //     }
      //   };
    });

    @getter()
    class Student {
      age: number = 18;
      gender: string = 'male';

      check() {}
    }
    // Creating a new student
    const jane: any = new Student();
    const james: any = new Student();

    console.log(jane.getAge());
  });

  test('Extending class functionality', () => {});

  test('Reading and writing decorator metadata', () => {
    // Advance usage. Ability to read and write new meta data
  });
});
