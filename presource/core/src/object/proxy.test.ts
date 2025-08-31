import { describe, test, expect } from '@jest/globals';
import { objectProxy } from './proxy';

describe('Object Proxy - Proxifying an Object', () => {
  test('Basic Object Spying', () => {
    const object = {};

    // Proxied Object
    const proxied = objectProxy(object, {
      get: () => {
        // Spying on GET
        expect.assertions(1);
      },
    });

    proxied.value = true;
    // Proxied Object
    expect(object).toStrictEqual({ value: true });
  });

  test('Basic Proxifying an Object', () => {
    const object = {};

    const proxied = objectProxy(object, {
      get: () => {
        // Spying on GET
        expect.assertions(1);
      },
      set: () => {
        // Spying on SET
        expect.assertions(2);
        return true;
      },
    });

    // Checking if Proxied value is undefined
    expect(proxied.value).toBeUndefined();
    // Triggering Proxied Value update
    proxied.value = 5;
    // No changes
    expect(object).toStrictEqual({});
  });

  test('Can bypass set or update', () => {
    const object: { [key: string]: any } = {};

    const proxied = objectProxy(object, {
      set: ({ k, v, o }) => {
        if (k === 'banana') {
          // Updating
          o[k] = v;
        }
      },
    });

    proxied.apple = 'hello';
    proxied.banana = 'yes';

    expect(object).toStrictEqual({ banana: 'yes' });
  });
});
