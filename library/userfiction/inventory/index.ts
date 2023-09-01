/**
 * For building an inventory.
 * Inventory is a list of items that can be manipulated and modified.
 *
 * Its job is purely keeping a record, allowing set and get and some basic filtering.
 * Do not overload it with other methods.
 */
import { InventoryDataType } from './types/data';
import { InventoryControlType } from './types/control';
import { inventoryMethodGet } from './methods/get';
import { objectUpdate } from '@library/presource/js/object/update';

type Inventory = (data?: InventoryDataType) => InventoryControlType;

export const inventory: Inventory = (data = {} as InventoryDataType) => {
  // This will be a handler function
  const handler = (() => {
    // returning the object with data mapped into the object
    return { data };
  }) as InventoryControlType;

  // Extending Handler functionality
  objectUpdate(handler, {
    // For getting a item in the inventory
    get: (id: string) => inventoryMethodGet(handler, id),
  });

  return handler;
};
