import { useRef } from 'react';
import { isUndefined } from '@presource/core';

export type UseReferenceHook = <T>(initialValue?: T) => {
    (): T;
    (value?: T): void;
};

// Standard use state hook
export const useReferenceHook: UseReferenceHook = (initialValue) => {
    const reference = useRef(initialValue);

    return ((updatedValue: any) => {
        if (isUndefined(updatedValue)) return reference.current;

        reference.current = updatedValue;
    }) as any;
};
