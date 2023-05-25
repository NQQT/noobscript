import { describe, expect, test, jest } from '@jest/globals';
import { createPromise } from './create';

describe('Create promise', () => {
  test('Promise created successfully', () => {
    const control: any = {};
    const promise = createPromise(control);

    expect(control.resolve).not.toBeUndefined();
    expect(control.reject).not.toBeUndefined();
  });
});
