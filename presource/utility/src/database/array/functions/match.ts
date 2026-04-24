import { arrayDatabase } from '..';
import { isEqual, objectEach } from '@presource/core';
import { ArrayDatabase } from '../class';

// Match Function for Array
export const matchFunction = ($self: ArrayDatabase, matcher: { [key: string]: any }) => {
    const $result = arrayDatabase();

    // Scanning Through Each Item
    $self.each(({ value: item, index }) => {
        let isMatched = false;
        // Scanning Through Each Object
        objectEach(matcher, ({ value, key }) => {
            // Checking Matched Information
            isMatched = isEqual(item[key], value);
            // If Matched. Break immediately
            if (isMatched) return isMatched;
        });
        // If Matched. Add to Result
        if (isMatched) $result.push($self[index]);
    });
    // Return the Matched Result
    return $result;
};
