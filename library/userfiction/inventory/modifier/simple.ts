import { InventoryControlType } from '../types/control';
import { objectProxy } from '@library/presource/js/object/proxy';
import { typeSwitch } from '@library/presource/js/type/switch';
import { InventoryDataType } from '../types/data';
import { inventory } from '../index';
import { objectEach } from '@library/presource/js/object/each';

/**
 * This modifier create a simple inventory.
 * For most basic use, this is sufficient. See test to see how it will work.
 */

type Simple = (data?: { [key: string]: any } | InventoryControlType) => {
  (): void;
  [key: string]: number;
};

export const simple: Simple = (data) => {
  // Building an inventory
  const resources = typeSwitch(data, {
    // If object is passed (assuming it is a simple object list)
    object: ({ value }) => {
      // Create a new inventory data list
      const inventoryData: InventoryDataType = { list: {} };
      // Scan through the data, binding to a new inventory data
      objectEach(value, ({ k, v }: any) => {
        // Constructing the data
        inventoryData.list[k] = { id: k, amount: v || 0 };
      });
      // Returning the simple inventory data list
      return inventory(inventoryData);
    },
    // If it is a function, simply wrap it around the modifier
    function: () => data,
    // Undefined, return a simple data constructor
    undefined: () => inventory({} as InventoryDataType),
  });

  // This is a handler function for more advance configuration
  const handler = () => {
    // return an object with data in it if the handler is called by itself.
    return { data };
  };

  return objectProxy(handler, {
    // Simply returns the amount by the k string
    get: ({ k }) => resources.get(k).amount(),
    // Simply set the value onto the amount
    set: ({ k, v }) => resources.get(k).amount(v),
  });
};
