import { RecipeControlType } from '../types/control';
import { objectHasKey } from '@library/presource/js/object/has';
import { recipeEntry } from '../entry';

// This method allows item to be get from the recipe list.
export const recipesMethodGet = (recipes: RecipeControlType, id: string): any => {
  // Get out the data
  const { data } = recipes();
  // Ensuring that within data, the inventory id should exist
  if (!objectHasKey(data, 'list')) {
    // Setting up the list if it doesn't exist
    data.list = {};
  }
  // Extracting out the list from that data
  const { list } = data;
  // Verifying the list contains a particular id
  if (!objectHasKey(list, id)) {
    // If list doesn't contain that id, then try and add it.
    list[id] = {
      id,
    };
  }
  // Returning a recipe entry
  return recipeEntry(list[id]);
};
