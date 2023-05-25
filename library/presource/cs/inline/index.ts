/**
 *
 * For Converting Styled Object to Style String
 *
 */

import { toString } from '../../js/to/string';
import { isObject } from '../../js/is/object';
import { objectEach } from '../../js/object/each';

// The Standard Styled Object.
type StyledObject = { [key: string]: number | string | StyledObject };

// For Converting Style into Proper Inlines
export const inlineStyled = (style: StyledObject) => {
  // The Style List
  const list: string[] = [];

  // Scanning Through the Style Object
  objectEach(style, ({ value, key }) => {
    // Checking Wehtehr item is an object or not
    if (isObject(value)) {
      // If it is an object. Convert it with inlines
      list.push(`${key.toString()}{${inlineStyled(value)}}`);
    } else {
      // Fixing Key
      key = toString(key).replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      // Adding Inline Styling
      list.push(`${key}:${value};`);
    }
  });

  // Returning the Style Listing
  return list.join('');
};
