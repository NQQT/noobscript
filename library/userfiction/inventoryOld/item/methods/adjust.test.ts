import { describe, test, expect } from '@jest/globals';
import { inventoryItem } from '..';

describe('Inventory Item Adjustment Function', () => {
  test('Increase by 1', () => {
    const item = inventoryItem({ value: 10 });
    expect(item.data().value).toBe(10);
    // Increasing item by one
    item.adjust();
    expect(item.data().value).toBe(11);
  });

  test('Increase by a positive number', () => {
    const item = inventoryItem({ value: 10 });
    expect(item.data().value).toBe(10);
    item.adjust(2);
    expect(item.data().value).toBe(12);
    item.adjust(8);
    expect(item.data().value).toBe(20);
  });

  test('Decrease by a negative integer', () => {
    const item = inventoryItem({ value: 10 });
    expect(item.data().value).toBe(10);
    item.adjust(-3);
    expect(item.data().value).toBe(7);
    item.adjust(-5);
    expect(item.data().value).toBe(2);
  });
});
