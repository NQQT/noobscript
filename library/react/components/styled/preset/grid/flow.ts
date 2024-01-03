import { arrayEach } from '@library/presource/js/array/each';
import { instanceCreate } from '@library/presource/js/instance/create';
import { setConstant } from '@library/presource/js/set/constant';
import { stringIncludes } from '@library/presource/js/string/includes';
import { FillerFunction } from '../type';

/** Preset filler for Grid Flow */
export const styledPresetGridFlow: FillerFunction = ({ v }) => {
  // Create a New Set
  const flow = instanceCreate(setConstant());
  flow.add('row');
  let display = 'grid';
  // Checking the inputted value
  stringIncludes(v, {
    // Matching it against all possible values
    inline: () => {
      // If Inline. Set to Inline Grid
      display = 'inline-grid';
    },
    column: () => {
      // If Column, then delete row and added column
      flow.delete('row');
      flow.add('column');
    },
    dense: () => {
      // If Dense, added dense
      flow.add('dense');
    },

    flex: ({ inline, column }) => {
      // Making grid act like flex box
      inline(); // Triggering Inline
      column(); // Triggering Column
    },
  });

  // Combining At the end
  const gridAutoFlow: string[] = [];
  arrayEach(['column', 'row', 'dense'], (item) => {
    if (flow.has(item.v)) {
      gridAutoFlow.push(item.v);
    }
  });

  // Returning The Style Object
  return {
    display,
    gridAutoFlow: gridAutoFlow.join(' '),
  };
};
