import { Params } from '..';
import { arrayEach } from '../../each';
import { typeSwitch } from '../../../type';
import { isEqual } from '../../../is';

type Possible = string | boolean | number | null | undefined;
type Arguments = {
  index: number;
  value: any;
};
type FilterCallback = (args: Arguments) => boolean;
type Request = Possible | Possible[] | FilterCallback;
type SelectFunction = (params: Params, request: Request) => any;

/** The Primary Select Function */
export const selectFunction: SelectFunction = (params, request) => {
  // Extracting data from params
  const { wrapper, element, config } = params;

  // Filter Config Function
  const filter = config.filter || [];
  filter.push((data) => {
    // Depending on the request
    return typeSwitch(request, {
      // If Number. Simply check against index
      number: ({ v }) => isEqual(v, data.i),
      // string: ({ v }) => {},
      array: ({ v, N, S, B }) => {
        // If Array is passed, simply check only one to be passed
        return arrayEach(v, ({ value }) => {
          const result = typeSwitch(value, {
            number: () => N(value),
            string: () => S(value),
            boolean: () => B(value),
          });
          // If Result is True. Return thetrue value
          if (result) return true;
        });
      },
      // By Default. Return True
      default: () => true,
    });
  });

  // Creating a New Wrapper
  return wrapper(element, { ...config, filter });
};
