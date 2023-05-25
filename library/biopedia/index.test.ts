import { describe, test, expect } from '@jest/globals';
import { database } from '.';

describe('Database Test', () => {
  test('Database access', () => {
    expect(database()).toBeNull();
  });
});
