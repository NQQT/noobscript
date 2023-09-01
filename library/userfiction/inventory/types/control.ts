/**
 * Inventory controller allows access to the inventory stored data and information.
 */
import { InventoryDataType } from './data';

export type InventoryControlType = {
  // Configuration Function. This function will configure the inventory
  (): { data: InventoryDataType };
  // For getting an item by its id. Returns a list of methods that can be used
  get: (id: string) => {
    // for accessing the amount
    amount: {
      // When nothing is insert, the value will be returned
      (): number;
      // When a number is inserted, the amount within will be updated
      (value: number): void;
      // A function can be inserted too, allow modification of the current amount more easily
      // tslint:disable-next-line:unified-signatures
      (input: (current: number) => number): void;
    };
  };
};
