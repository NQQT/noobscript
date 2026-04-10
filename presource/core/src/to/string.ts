import { typeSwitch } from '../type';
import { objectStringify } from '../object';
import { NULL_STRING, UNDEFINED_STRING } from '../constants';
import { arrayStringify } from '../array';
import { stringSwitch } from '../string';

/** For Converting various value to String */
export const toString = (...input: any[]): string => {
    // Checking against String
    return stringSwitch(input.length, {
        0: '',
        1: () => {
            // Extracting Input 0
            const unknown = input[0];
            // To String Switch is based On Type
            return typeSwitch(unknown, {
                // If Object. Stringify the object
                object: () => objectStringify(unknown),
                array: () => arrayStringify(unknown),
                null: () => NULL_STRING,
                undefined: () => UNDEFINED_STRING,
                // Unable to Convert for whatever reason
                default: () => unknown.toString()
            });
        },
        // Special case. If it is more than 1 length
        default: () => input.map((value) => toString(value))
    });
};
