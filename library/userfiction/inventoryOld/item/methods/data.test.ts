import { describe, test, expect } from '@jest/globals';
import { inventoryItem } from '..';

describe('Inventory Item data function', () => {
  // Item
  const item = inventoryItem({});

  test('Accessing variables', () => {
    expect(item.data('size')).toBe(Infinity);
    expect(item.data('value')).toBe(0);
    expect(item.data('type')).toBe('solid');

    // Accessing multiples, use array format
    expect(item.data(['value', 'type'])).toMatchObject({ value: 0, type: 'solid' });
  });

  test('Updating variables', () => {
    item.data({ value: 5, type: 'liquid' });
    expect(item.data()).toMatchObject({ value: 5, type: 'liquid', size: Infinity });
  });
});
