/**
 * The test below will demonstrate how to use Inventory of UserFiction correctly.
 */

import { inventory } from '../index';
import { simple } from './simple';

describe('how to use a simplified inventory', () => {
  it('basic usage of a simple inventory', () => {
    // First, you create a data source.
    // Inventory item will be stored into here.
    const data: any = {};

    // Create an item object for the inventory, wrap it around simple to create a simple inventory
    const items = simple(inventory(data));

    // Increase the wood value
    items.wood++;

    // Ensure Matching Item is possible.
    expect(data).toMatchObject({
      // The list of items within that data
      list: {
        // A first element should be added
        wood: {
          // Its id is wood
          id: 'wood',
          // The amount is 1 due to incrementing
          amount: 1,
        },
      },
    });
  });

  it('should be able to access values correctly', () => {
    // Can create a simple inventory by simply calling the method itself without input
    const resources = simple();
    expect(resources.wood).toBe(0);
    // set the wood value to 2, allows it to be 2
    resources.wood = 2;
    expect(resources.wood).toBe(2);
    // Can also use incrementation
    resources.wood++;
    expect(resources.wood).toBe(3);
  });
});
