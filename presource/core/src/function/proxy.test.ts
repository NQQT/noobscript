import { describe, expect, test } from '@jest/globals';
import { functionProxy, stringSwitch } from '@presource/core';

describe('Testing Proxy Function', () => {
  let expectedCurrentKey: any = null;
  let expectedParameters: any[] = [];

  // Constructing a proxied function
  const proxy = functionProxy(({ key, method, params }) => {
    // Checking the Key
    expect(key).toBe(expectedCurrentKey);
    // Depending on Method. It will be adjusted
    stringSwitch(method, {
      call: () => {
        // Only when called that parameters is equal
        expect(params).toStrictEqual(expectedParameters);
      },
      get: () => {
        // If Get. There are no Parameter set
        expect(params).toStrictEqual([]);
      },
    });
  });

  test('Basic usage of proxy function', () => {
    // Set the Expected Parameter
    expectedParameters = ['apple'];
    proxy('apple');

    // Checking Next Key
    expectedCurrentKey = 'update';
    proxy.update('apple');
    expectedParameters = [];
    proxy.update();

    expectedParameters = ['banana'];
    proxy.update('banana');

    // If went through the proxy function then the key is empty... or null?
    // Maybe null is better
    expectedCurrentKey = null;
    proxy('banana');

    // Updating
    expectedCurrentKey = '';
    expectedParameters = ['empty'];
    proxy['']('empty');
  });
});
