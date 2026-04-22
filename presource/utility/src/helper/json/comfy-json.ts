// The Comfy Json results
import { isString, isUndefined, objectEach } from '@presource/core';

type Option = {
    type: 'select' | 'radio' | 'boolean' | 'string' | 'number';
    options?: string[];
};

export type ComfyJson = (input: string | object) => {
    // Returns the json data
    (): {
        [key: string]: any;
    };
    (name: string): {
        inputs: (name: string, value: any) => void;
        option: (key: string, option?: Option) => void;
    };
    string: () => string;
    configs: () => {
        // The key is the name of the node itself
        [key: string]: {
            // the reference ot the input
            inputs: { [key: string]: any };
            options: { [key: string]: Option };
        };
    };
};

// For building a comfyJson
export const comfyJson: ComfyJson = (input: any) => {
    if (isString(input)) {
        // Convert to Object Format
        input = JSON.parse(input);
    }

    const handler: any = (select: string) => {
        // If select is undefined then return memory
        if (isUndefined(select)) return input;
        // Returns handler controllers
        return {
            inputs: (key: string, value: string) => {
                objectEach(input, ({ value: data }) => {
                    if (data._meta?.title === select) {
                        data.inputs[key] = value;
                    }
                });
            },
            option: (key: string, option?: Option) => {
                objectEach(input, ({ value: data }) => {
                    if (data._meta?.title === select) {
                        data._meta.options ||= {};

                        // Stashing options in meta
                        data._meta.options[key] = option || {
                            type: 'text'
                        };
                    }
                });
            }
        };
    };

    Object.assign(handler, {
        string: () => JSON.stringify(input),
        configs: () => {
            const result: any = {};
            objectEach(input, ({ value: data }) => {
                if (data._meta.options) {
                    // Adding to the configuration
                    result[data._meta.title] = {
                        inputs: data.inputs,
                        options: data._meta.options
                    };
                }
            });
            return result;
        }
    });

    return handler;
};
