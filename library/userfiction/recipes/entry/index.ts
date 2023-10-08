import { RecipesDescriptionType } from '../types/data';
import { recipesEntryCommandsRequiredFactory } from './commands/required';
import { recipesEntryCommandsConsumesFactory } from './commands/consumes';
import { objectUpdate } from '@library/presource/js/object/update';
import { recipesEntryCommandProducesFactory } from './commands/produces';

/**
 * The recipe wrapper allows modification of the recipe.
 */

export const recipeEntry = (data: RecipesDescriptionType) => {
  // Building a command listing.
  const commands = {};

  objectUpdate(commands, {
    required: recipesEntryCommandsRequiredFactory({ commands, data }),
    consumes: recipesEntryCommandsConsumesFactory({ commands, data }),
    produces: recipesEntryCommandProducesFactory({ commands, data }),
  });

  // Returns the command to be consumed
  return commands;
};
