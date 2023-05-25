import { arrayEach } from '../../../js/array/each';
import { arrayEnsures } from '../../../js/array/ensures';
import { objectEach } from '../../../js/object/each';
import { stringCapitalize } from '../../../js/string/capitalize';
import { MapperCallback } from '../assets/interface';

type Resolvers = { [key: string]: MapperCallback };

// Extending to the Edges
export const stringRemapSides = (item: string | string[], resolvers: Resolvers) => {
  // Constructing the Variant Box Model
  const boxModel = {
    // Single Direction
    l: 'left',
    r: 'right',
    t: 'top',
    b: 'bottom',
    // Multi Direction
    x: ['left', 'right'],
    y: ['top', 'bottom'],
  };

  arrayEach(arrayEnsures(item), ({ v: name }) => {
    const resolveFunction = resolvers[name];

    if (resolveFunction) {
      // If Resolve Funtion is Valid.
      objectEach(boxModel, ({ k, v }) => {
        // Creating New resolver based on name and prefix
        resolvers[name + k] = (data, resolversMain) => {
          // Getting the Style Object
          const resultedStyle = resolveFunction(data, resolversMain);

          // The Result
          const result: any = {};
          arrayEach(arrayEnsures(v), ({ v: suffix }) => {
            // Making sure it is capitalise
            const addon = stringCapitalize(suffix);
            // Scanning through each resulted style
            objectEach(resultedStyle, ({ k: key, v: style }: any) => {
              // Adding only the output
              result[key + addon] = style;
            });
          });
          // Return the new resulted style
          return result;
        };
      });
    }
  });

  // Returning the Object Resolvers
  return resolvers;
};
