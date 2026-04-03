// For converting something to rem
import { objectMap, typeSwitch } from '@presource/core';

export const styleStructure = (input: any) => {
    const correctStructure = typeSwitch(input, {
        object: ({ value }) => value,
        default: ({ value }) => ({ xs: value })
    });

    // Remapping the style
    return objectMap(correctStructure, (entry) => {
        return typeSwitch(entry.value, {
            // If it is string
            string: ({ value, number: toNumber }) => {
                // if it is not a number, simply returns it (could be 0px)
                if (isNaN(+value)) return value;
                return toNumber(value);
            },
            // Number decoding
            number: ({ value }) => {
                const num = (value * 8) / 16;
                if (num) return `${num}rem`;
                // Otherwise, returns 0
                return 0;
            },
            default: ({ value }) => value
        });
    });
};
