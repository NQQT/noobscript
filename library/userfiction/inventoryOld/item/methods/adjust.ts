import { InventoryItem } from '..';

type Structure = (
  item: ReturnType<InventoryItem>,
  input: {
    amount: number;
  },
) => void;

export const methodInventoryItemAdjust: Structure = (item, input) => {
  console.log(item, item.data('value'));

  // Updating the Data Object
  item.data({
    // Updating the value
    value: item.data('value') + input.amount,
  });
  // Returning the Proxy Item
  return item;
};
