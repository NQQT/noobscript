import { arrayDatabase } from '..';
import { FALSE } from '../../../js/constants/primitive';
import { isEqual } from '../../../js/is/equal';
import { objectEach } from '../../../js/object/each';
import { ArrayDatabase } from '../class';

// Match Function for Array
export const matchFunction = ($self: ArrayDatabase, matcher: { [key: string]: any }) => {
  const $result = arrayDatabase();

  // Scanning Through Each Item
  $self.each(({ value: item, index }) => {
    let isMatched = FALSE;
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
