import { InventoryControlType } from '../types/control';
import { objectHasKey } from '@library/presource/js/object/has';
import { InventoryItemType } from '../types/item';
import { isUndefined } from '@library/presource/js/is/undefined';
import { typeSwitch } from '@library/presource/js/type/switch';

/**
 * This is a get method, returning
 *
 */

export const inventoryMethodGet = (inventory: InventoryControlType, id: string): any => {
  // Get out the data
  const { data } = inventory();
  // Ensuring that within data, the inventory id should exist
  if (!objectHasKey(data, 'list')) {
    // Setting up the list if it doesn't exist
    data.list = {};
  }
  // Extracting out the list from that data
  const { list } = data;
  // Verifying the list contains a particular id
  if (!objectHasKey(list, id)) {
    // If list doesn't contain that id, then try and add it.
    list[id] = {
      id,
    };
  }
  return itemModifier(list[id]);
};

const itemModifier = (item: InventoryItemType) => {
  // Return the modifier object for future consumption
  return {
    amount: (input: any) => {
      // If input is not defined, then return the item amount (or 0 if it does not exist)
      if (isUndefined(input)) return item.amount?.current || 0;

      typeSwitch(input, {
        number: ({ value }) => {
          // updating the amount number
          item.amount = { ...item.amount, current: value };
        },
        function: () => {
          // If a function is passed, then process the function as it is, by passing the current value
          item.amount = { ...item.amount, current: input(item.amount?.current || 0) };
        },
      });

      // Returns nothing at the end, really.
    },
  };
};
