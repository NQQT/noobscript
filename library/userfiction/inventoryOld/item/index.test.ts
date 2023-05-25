import { describe, test, expect } from '@jest/globals';
import { inventoryItem } from '.';

describe('Inventory Item', () => {
  test('an item', () => {
    const source = { value: 12 };
    // Creating an item
    const item = inventoryItem(source);
  });
});
