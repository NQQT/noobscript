import { objectProxy } from '@library/presource';
import { methodInventoryItemAdjust, methodInventoryItemCount, methodInventoryItemData } from './methods';
type Data = {
  // The Item identification. Unnecessary, but is there
  id?: string;
  value?: number;
  // What type is this item
  type?: 'solid' | 'liquid' | 'gas';
  // Optional Fields
  size?: number;
};

/** For Easier manage control */
type Returned = {
  count: () => number;
  data: {
    (request: 'value' | 'size'): number;
    (request: 'type'): string;
    (update: { [key: string]: any }): Returned;
    // Returning Data Object
    (): Data;
  };
  // For adjusting a value
  adjust: (amount?: number) => Returned;
};

export type InventoryItem = (data: Data, listener?: any) => Returned;

/** An Inventory Item */
export const inventoryItem: InventoryItem = (data, listener) => {
  // The List to return
  const list: { [key: string]: any } = {
    count: () => methodInventoryItemCount(proxy),
    // For Getting the necessary data
    data: (update?: any): any => methodInventoryItemData(data, update),
    // Increasing an amount
    adjust: (amount: number = 1): any => methodInventoryItemAdjust(proxy, { amount }),
  };

  // Returning a Object Proxy Type
  const handlerFunction = () => {
    // Do nothing for now
    return null;
  };

  // Constructing a proxy event listener
  const proxy: any = objectProxy(handlerFunction, {
    // Get funtion interceptor
    get: ({ k }) => {
      const callback = list[k];
      return callback ? callback : proxy;
    },
  });

  // Return the Proxy object
  return proxy;
};
