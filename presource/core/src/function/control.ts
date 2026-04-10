// Type listing
import { objectProxy } from '../object';

type Callback = (input: { key: string; value?: any }) => any;
export type FunctionControl = <OptionType = { [key: string]: any }>(
    callback: Callback
) => (() => OptionType) & OptionType;

export const functionControl: FunctionControl = (callback: any) => {
    // This is the primary handler function
    const handlerFunction = () => {
        return callback({});
    };

    // Wrapped around the object proxy
    return objectProxy(handlerFunction, {
        // Ensuring get is correctly
        get: ({ key }) => {
            if (['name', 'prototype', 'displayName'].includes(key)) {
                return;
            }
            return callback({ key });
        }
    });
};
