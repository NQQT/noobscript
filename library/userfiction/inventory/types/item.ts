/**
 * The structure of the inventory item is listed here.
 * Information about how it works should also be listed here.
 */

export type InventoryItemType = {
  id: string;
  durability?: {};
  // The matter of the item
  matter?: {
    // The state of which item can be, gas, liquid or solid. Default should always be solid.
    // Different state modify the inventory.
    state: 'solid' | 'liquid' | 'gas';
  };
  // Amount logic will represent a concrete value of this item
  amount?: {
    // The allowable minimum amount. Leave blank will default to 0
    minimum?: number;
    // The allowable maximum amount. Leave blank will default to infinity.
    maximum?: number;
    // The current amount. This could be number of item or the volume (if liquid)
    current: number;
  };
};
