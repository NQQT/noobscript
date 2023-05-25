import { dataManager } from '../assets';
import { InventoryItem, inventoryItem } from './item';

type List = { [key: string]: Parameters<InventoryItem>[0] };
type Returned = {
  (): List;
  (input: string): ReturnType<InventoryItem>;

  // Any Key is possible.
  [key: string]: (...data: any) => Returned;
};

type Structure = (list?: List) => Returned;

export const inventoryManager: Structure = (list = {}) => {
  // Return a New Data Manager
  return dataManager({
    list,
    object: inventoryItem,
  });
};
