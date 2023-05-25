import { SPACE } from '../../../js/constants/string';
import { objectUpdate } from '../../../js/object/update';
import { typeSwitch } from '../../../js/type/switch';
import { objectStyled } from '..';
import { arrayEach } from '../../../js/array/each';
import { MapperCallback } from '../assets/interface';

/** For Resolving Media Queries */
export const objectMapMediaMinMax = (minWidth?: number, maxWidth?: number): MapperCallback => {
  const mediaArray = [];

  if (minWidth) mediaArray.push(`(min-width:${minWidth}px)`);
  if (maxWidth) mediaArray.push(`(max-width:${maxWidth}px)`);

  let id = '@media';
  if (mediaArray.length) {
    // Construting the Identification for the Media
    id += SPACE + mediaArray.join(SPACE + 'and' + SPACE);
  }

  // Return the Resolver Function
  return ({ value, output }, resolvers) => {
    typeSwitch(value, {
      array: ({ v, object }) => {
        // If Array.Scan Through The Array
        arrayEach(v, (data) => {
          // Loop Through Object Data
          object(data.v);
        });
      },
      // Only Process if value is an object
      object: ({ v }) => {
        // Updating Nested with Value
        output[id] = objectUpdate(output[id] || {}, objectStyled(v, resolvers));
      },
    });
  };
};
