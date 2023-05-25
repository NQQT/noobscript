import { jsonConstant, objectEach, stringSwitch, typeSwitch } from '@library/presource';

type Data = { [key: string]: any };
type Structure = (data: Data) => string;

// For creating a graphQL variable string
export const createGraphQLVariableString: Structure = (data) => {
  const list: string[] = [];

  // For Scanning through the data object
  objectEach(data, ({ k, v }) => {
    // Convertion
    list.push(
      k +
        ':' +
        typeSwitch(v, {
          string: () => {
            // Getting the Leading value
            const leading: string = v[0];

            // Getting the Result String
            const result = stringSwitch(leading, {
              $: () => '$' + (v.substring(1) || k),
            });
            // Return the Result. or Fallback
            return result || jsonConstant().stringify(v);
          },
          default: () => jsonConstant().stringify(v),
        }),
    );
  });

  // Returning the Joined List
  return '(' + list.join(',') + ')';
};
