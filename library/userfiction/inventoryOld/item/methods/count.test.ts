import { describe, test, expect } from '@jest/globals';
import { inventoryItem } from '..';

describe('Inventory item, count method', () => {
  const item = inventoryItem({});
  test('Check count functionality', () => {
    expect(item.count()).toBe(0);
    item.data({ value: 12 });
    expect(item.count()).toBe(12);
  });
});
