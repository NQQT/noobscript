import { useState } from 'react';
import { isUndefined } from '@presource/core';

export type UseStateHook = <T>(initialValue?: T) => {
    (): T;
    (value?: T): void;
};

// Standard use state hook
export const useStateHook: UseStateHook = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    return ((updatedValue: any) => {
        if (isUndefined(updatedValue)) return value;

        setValue(updatedValue);
    }) as any;
};
