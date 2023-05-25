import { objectStyled } from '..';
import { arrayEach } from '../../../js/array/each';
import { objectUpdate } from '../../../js/object/update';
import { typeSwitch } from '../../../js/type/switch';
import { MapperCallback } from '../assets/interface';

// Arguments Information
type Arguments = Parameters<MapperCallback>[0] & {
  // Wrapper Information
  wrapper: string;
  w: string;
  r: Parameters<MapperCallback>[1];
  resolvers: Parameters<MapperCallback>[1];
};

type Wrapper = (args: Arguments) => any;
type Structure = (wrapper?: Wrapper) => MapperCallback;

// Map Wrapper Styled Object
export const objectMapWrapper: Structure = (callback = () => '') => {
  // Return a Mapper Callback Function
  return (payloads, resolvers) => {
    // Scanning Through the Type Switch
    typeSwitch(payloads.value, {
      array: ({ v, object }) => {
        // If array. Scan through the array
        arrayEach(v, (data) => {
          // Triggering Object information
          object(data.v);
        });
      },
      object: ({ v }) => {
        const params = {
          ...payloads,
          resolvers,
          r: resolvers,
          wrapper: '',
          w: '',
        };

        // Getting a New Wrapper
        const value = callback(params);
        // Updating the Wrapper
        params.wrapper = value;

        // Get the Updated Object
        const updatedObject = objectStyled(v, resolvers);
        const { output } = payloads;
        const { wrapper } = params;

        // Checking if Wrapper Exists
        if (wrapper) {
          // Updating the Output with New Wrapper
          output[wrapper] = objectUpdate(output[wrapper] || {}, updatedObject);
        } else {
          // If Wrapper value exists
          objectUpdate(output, updatedObject);
        }
      },
    });
  };
};
