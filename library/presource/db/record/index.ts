/**
 * Record Database designed to store loosely record, which can be compiled together into a proper record.
 * It is quite powerful for progressively update design
 */
import { functionProxy } from '../../js/function/proxy';
import { stringSwitch } from '../../js/string/switch';

/**
 * This will detailled what is possible with RecordDatabase
 */
type RecordDatabase = <T>(setter: T) => {
  (input: string): T;
  // Find Method
  find: () => {};
};

export const recordDatabase: RecordDatabase = (setter) => {
  // This is where item are stored
  const record = {};

  const editor = functionProxy(({ key, method, params }) => {
    stringSwitch(method, {
      call: () => {
        // If method is Called
        console.log(key, method, params);
        return editor;
      },
      get: () => {
        // If Param is called instead
        return (...inputs: any) => {
          console.log(inputs);
        };
      },
    });
  });

  return functionProxy(({ key, method, params }) => {
    // Depending on Method. It will be adjusted
    stringSwitch(method, {
      call: () => {
        // If method is Called
        console.log(key, method, params);
        return editor;
      },
      get: () => {
        // If Param is called instead
        return (...inputs: any) => {
          console.log(inputs);
        };
      },
    });
  }) as any;
};
