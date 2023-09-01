import { inventory } from '../index';

describe('inventory get methods', () => {
  it('should be able to get item manipulator', () => {
    // Creating a new resource inventory
    const resources = inventory();
    // Accessing Stone inventory
    const stones = resources.get('stone');

    // Stones must not a null object
    expect(stones).not.toBeNull();
    // From here, one can acess multiple other things like amount
    expect(stones.amount()).toBe(0);
  });
});
