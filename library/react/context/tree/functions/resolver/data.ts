/**
 *
 * This function is used to resolve a context
 *
 */
import { typeSwitch } from '@library/presource/js/type/switch';
import { isNumber } from '@library/presource/js/is/number';
import { arrayEach } from '@library/presource/js/array/each';
import { isInvalid } from '@library/presource/js/is/invalid';
import { isEqual } from '@library/presource/js/is/equal';
import { treeDatabase } from '@library/presource/db';

export const resolveDataFunction = (info: { parameters: any[]; tree: ReturnType<typeof treeDatabase> }) => {
  // Extracting information
  const { parameters } = info;
  let { tree } = info;
  let field: any;

  typeSwitch(parameters.shift(), {
    // if number. it is an offset value
    number: ({ v }) => {
      // Negative Offset means go up the tree
      while (v < 0) {
        const parent = tree.parent();
        // Save to next level if parent exists
        if (parent) tree = parent;
        v++;
      }
      // Get the Id
      field = parameters.shift();
    },
    // If the first parameter is an object
    object: ({ value, N }) => {
      field = value.field;
      // Store the
      typeSwitch(value.layer, {
        // if Number
        number: () => {
          if (isNumber(value.layer)) {
            parameters.push(value.field);
            N(value.layer);
          }
        },
        // Jump Case. This allows jumpoing to a named node or layer (if there is any)
        string: (data) => {
          // Get the Tree Database
          const root = tree.root();
          // Create an array list
          const list = root.descendants();
          list.unshift(root);
          // Scanning through Each Value
          arrayEach(list, ({ v }) => {
            // Extract name from data
            const { name } = v.data();
            if (!isInvalid(name) && isEqual(name.toString(), data.v)) {
              // Break out of the loop
              return (tree = v);
            }
          });
        },
      });
    },
    // By Default. Just store as it is
    default: ({ value }) => (field = value),
  });

  // Return the proper values
  return { context: tree.data('context'), field };
};
