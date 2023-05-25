import { describe, test, expect } from '@jest/globals';
import { inventoryManager } from './manager';

describe('Inventory Manager', () => {
  test('Inventory accessor function. Using new', () => {
    // Create a new inventory
    const inventory = inventoryManager();
    // Getting the inventory list. Empty object
    expect(inventory()).toMatchObject({});
  });

  test('Creating a new inventory with preloaded data', () => {
    const data = { apple: {}, banana: {} };
    // Creating an inventory
    const inventory = inventoryManager(data);
    // The return result should be matching
    expect(inventory()).toMatchObject({ apple: {}, banana: {} });
  });

  test('Setting and getting items', () => {
    // Creating an inventory list
    const inventory = inventoryManager();

    inventory('wood').adjust(10);
    expect(inventory()).toMatchObject({ wood: { value: 10 } });
    inventory('iron').adjust(5);
    expect(inventory()).toMatchObject({ wood: { value: 10 }, iron: { value: 5 } });
  });

  test('Event listener', () => {
    const inventory = inventoryManager();
    // Modifying the Event Listener
    inventory.onChange(({ id, value, previous }: any) => {
      expect(id).toBe('wood');
      expect(value).toBe(10);
      expect(previous).toBe(0);
    });

    inventory('wood').adjust(10);
  });
});
