// Json Editor
import { isString } from '@presource/core';

type Options = {
    type: 'select' | 'radio' | 'boolean' | 'string' | 'number';
    options?: string[];
};
export type JsonEditor = (input: string | object) => {
    (): { [key: string]: any };
    assign: (key: string, options: Options) => void;
    string: () => string;
};

// The Json Editor
export const jsonEditor: JsonEditor = (input) => {
    if (isString(input)) {
        // Convert to Object Format
        input = JSON.parse(input);
    }
    const memory: any = {
        data: input,
        options: {}
    };

    const handler: any = () => {
        return memory;
    };

    Object.assign(handler, {
        // Assign Configuration
        assign: (name: string, option: any) => {
            memory.options[name] = option;
        },
        string: () => {
            return JSON.stringify(memory);
        }
    });

    return handler;
};
