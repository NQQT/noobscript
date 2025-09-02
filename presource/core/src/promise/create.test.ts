import { describe, expect, test } from '@jest/globals';
import { createPromise } from '@presource/core';

describe('Create promise', () => {
  test('Promise created successfully', () => {
    const control: any = {};
    const promise = createPromise(control);

    expect(control.resolve).not.toBeUndefined();
    expect(control.reject).not.toBeUndefined();
  });
});
