/**
 * The structure of the inventory item is listed here.
 * Information about how it works should also be listed here.
 */

export type InventoryItemType = {
  // The identifier of the item.
  id: string;
  // The number of item available. There should always be a number. non-logical number is acceptable.
  amount: number;
};
