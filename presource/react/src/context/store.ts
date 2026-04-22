import { isInvalid, objectExtract, objectObserve, stringSwitch } from '@presource/core';
import { useEffect, useState } from 'react';

export type ReactContextStore = <T extends { [key: string]: any }>(
    input: T
) => T & {
    (): T;
    (option: 'state'): {
        refresh: () => void;
    };
    (option: 'data'): {
        // For resetting a specific data
        reset: (field?: keyof T) => void;
        // For checking an initial
        initial: () => T;
    };
};

// For Creating a React Context Store
export const reactContextStore: ReactContextStore = (initialState = {} as any) => {
    // The current state store
    const stateStore = { ...initialState };

    const getCurrentState = () => {
        return stateStore as any;
    };

    // List of all components that need to be refreshed
    const refreshList = new Set<() => void>();

    // Force re-rendering of each app
    const forceRerender = () => {
        setTimeout(() => {
            refreshList.forEach((refresh) => refresh());
        });
    };

    // Use Data Hook
    const useData = () => {
        const setState = useState({})[1];
        useEffect(() => {
            // For forcing a refresh pattern
            const refresh = () => {
                setState({});
            };
            refreshList.add(refresh);
            // Cleaning up
            return () => {
                refreshList.delete(refresh);
            };
        }, []);
        // Return the current state
        return getCurrentState();
    };

    // Proxying the use data handler
    const proxyHandler: any = objectObserve(useData, ({ depth, method, object, value, key, path }) => {
        stringSwitch(method, {
            get: () => {
                const currentValue = objectExtract(getCurrentState(), path.join('.'));
                if (isInvalid(currentValue)) {
                    object[key] = null;
                } else {
                    object[key] = currentValue;
                }
            },
            set: () => {
                if (!depth) {
                    getCurrentState()[key] = value;
                }
                forceRerender();
            }
        });
    });

    // Returning the proxy handler
    return proxyHandler;
};
