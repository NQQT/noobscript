import { recipeManager } from '../index';

describe('recipes get methods', () => {
  it('should be able to get the recipes object', () => {
    // Creating a new resource inventory
    const recipes = recipeManager();
    // Accessing Stone inventory
    const axe = recipes.get('axe');

    // There should be nothing yet
    expect(axe.required()).toMatchObject({});
    // Creation of axe requires a hammer
    axe.required({
      hammer: 1,
    });
    // Accessing through the list
    expect(axe.required()).toMatchObject({ hammer: 1 });

    // Consumes wood and irons
    expect(axe.consumes()).toMatchObject({});
    axe.consumes({
      wood: 10,
      iron: 12,
    });
    expect(axe.consumes()).toMatchObject({
      wood: 10,
      iron: 12,
    });

    expect(axe.produces()).toMatchObject({}); // Produces Splinters
    axe.produces({
      splinters: 20,
    });

    expect(axe.produces()).toMatchObject({
      splinters: 20,
    });
  });
});
