/**
 *
 * For extracting keys or values from an object
 *
 */

import { UNDEFINED } from '../constants';
import { isObject } from '../is';
import { typeSwitch } from '../type';

// Object Extract Type format
export type ObjectExtract = (object: { [key: string]: any }, extract: any) => any;

/** Parses a single path segment which may include array index notation, e.g. "fruits[0]" or "nested[0]" */
const parseSegment = (pointer: any, segment: string): any => {
    // Match a key and any number of bracket indexes, e.g. "fruits[0][1]"
    const bracketPattern = /^([^\[]*)((?:\[\d+\])*)$/;
    const match = segment.match(bracketPattern);

    if (!match) return UNDEFINED;

    const [, key, indexes] = match;

    // Access the key first (if present)
    let value = key ? (isObject(pointer) ? pointer?.[key] : UNDEFINED) : pointer;

    // Then step through each [index] in order
    if (indexes) {
        const indexMatches = indexes.match(/\d+/g) ?? [];
        for (const idx of indexMatches) {
            if (value === UNDEFINED || value === undefined) return UNDEFINED;
            value = Array.isArray(value) ? value[Number(idx)] : UNDEFINED;
        }
    }

    return value ?? UNDEFINED;
};

/** For extracting anything within an object */
export const objectExtract: ObjectExtract = (object: any, extract: any) => {
    // Depending on what value extract is, the result could be different
    const result: any = typeSwitch(extract, {
        number: () => {
            // !Not sure what to do with number yet
            return UNDEFINED;
        },
        // If String. Use Drilling path. If only single path, better to use direct access!
        string: ({ v }) => {
            let pointer = object;
            // Split on "." then parse each segment for bracket notation
            v.split('.').forEach((segment: string) => {
                pointer = parseSegment(pointer, segment);
            });

            return pointer;
        },
        array: ({ v, S, N, A }) => {
            // if array, accessing multiple instances
            return v.map((value: any) => {
                return typeSwitch(value, {
                    number: () => N(value),
                    string: () => S(value),
                    array: () => A(value),
                    default: () => UNDEFINED
                });
            });
        }
    });

    return result;
};
