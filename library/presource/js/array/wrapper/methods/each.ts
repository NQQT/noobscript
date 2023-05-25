import { arrayEach } from '../../each';
import { Params } from '..';

type Argument = {
  index: number;
  value: any;

  i: number;
  v: any;
};
type Callback = (args: Argument) => any;
// The Structure of the Each Fnction
type EachFunction = (params: Params, callback: Callback) => any;

// The Primary Each Function
export const eachFunction: EachFunction = (params, callback) => {
  // Extracting Necessary Information
  const { element, config, instance } = params;

  // For checking whether the value is valid or not
  const valueSelected = (data: any) => {
    const skipValue = arrayEach(config.filter || [], ({ v }) => {
      const check = v(data, params);
      // If check fails, return
      if (!check) return true;
    });
    // Return what the opposite is
    return !skipValue;
  };

  // Scannign through the element
  arrayEach(element, (data) => {
    if (valueSelected(data)) {
      // Accessing the callback data for now
      return callback(data);
    }
  });

  // Return the Instance
  return instance;
};
