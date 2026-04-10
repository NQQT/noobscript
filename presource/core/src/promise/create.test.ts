import { promiseCreate } from '@presource/core';

describe('Create promise', () => {
    test('Promise created successfully', () => {
        const control: any = {};
        const promise = promiseCreate(control);

        expect(control.resolve).not.toBeUndefined();
        expect(control.reject).not.toBeUndefined();
    });
});
