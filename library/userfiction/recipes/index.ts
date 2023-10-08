import { RecipeDataType } from './types/data';
import { RecipeControlType } from './types/control';
import { objectUpdate } from '@library/presource/js/object/update';
import { recipesMethodGet } from './methods/get';

/**
 * Recipes details the exchange of resource for another, either consuming or producing.
 * This is a rather simple one, that consumes/produces multiple item for one thing.
 *
 */

type RecipeManagerType = (data?: RecipeDataType) => RecipeControlType;

export const recipeManager: RecipeManagerType = (data = {} as RecipeDataType) => {
  // This will be a handler function
  const handler = (() => {
    // returning the object with data mapped into the object
    return { data };
  }) as RecipeControlType;

  // Extending Handler functionality
  objectUpdate(handler, {
    // For getting an item in the inventory
    get: (id: string) => recipesMethodGet(handler, id),
  });

  return handler;
};
