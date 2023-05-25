import { InventoryItem } from '..';

type Structure = (item: ReturnType<InventoryItem>) => any;

/** Inventory Data method */
export const methodInventoryItemCount: Structure = (item) => {
  // Returning the value count
  return item.data('value');
};
