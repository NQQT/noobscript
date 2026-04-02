import { isUndefined } from '@presource/core';
import { useEffect, useState } from 'react';

export type SignalState = <T>(initialValue: T) => {
    (updated?: T): T;
    value: () => T;
};

// Signal State
export const signalState: SignalState = (initialValue) => {
    let value = initialValue;
    const list = new Set<() => void>();

    const valueFunction = (newValue: undefined) => {
        if (isUndefined(newValue)) {
            return value;
        }

        value = newValue;
        list.forEach((refresh) => refresh());
        return value;
    };

    const handlerFunction: any = (newValue: undefined) => {
        if (isUndefined(newValue)) {
            const setState = useState({})[1];
            useEffect(() => {
                const refresh = () => setState({});
                list.add(refresh);
                // Clean up
                return () => {
                    list.delete(refresh);
                };
            }, []);
            return value;
        }
        return valueFunction(newValue);
    };

    Object.assign(handlerFunction, {
        value: valueFunction
    });

    // Return the handler function
    return handlerFunction;
};
