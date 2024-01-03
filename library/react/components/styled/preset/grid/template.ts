/** Note that this is mainly used for grid column and row */

import { isEqual } from '@library/presource/js/is/equal';
import { arrayCreate } from '@library/presource/js/array/create';
import { typeSwitch } from '@library/presource/js/type/switch';
import { FillerFunction } from '../type';

export const styledPresetGridTemplate: FillerFunction = ({ v, t }) => ({
  // Return the Grid Template base on Switches
  gridTemplate: typeSwitch(v, {
    number: ({ value }) =>
      // Auto Fill based on number
      arrayCreate(({ index }) => {
        if (index < value) return '1fr';
      }).join(' '),
    // Array Setup Information
    array: () => v.map((value: any) => (isNaN(+value) ? t(v) : v + 'fr')).join(' '),
    string: ({ N, A }) => {
      // We are using ":" as seperator
      const list = v.split(':');
      if (isEqual(list.length, 1)) {
        // Extracting as a number
        const integer = +list[0];
        // If it is actuall a number
        if (!isNaN(integer)) return N(integer);
      }
      // If Not a number. Return array
      return A(list);
    },
  }),
});
