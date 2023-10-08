import { RecipesDescriptionType } from '../../types/data';
import { recipeEntry } from '../index';
import { isUndefined } from '@library/presource/js/is/undefined';
import { objectUpdate } from '@library/presource/js/object/update';

export type RecipesEntryCommandRequiredFactory = (input: {
  commands: ReturnType<typeof recipeEntry>;
  data: RecipesDescriptionType;
}) => RecipeEntryCommandRequired;

export type RecipeEntryCommandRequired = {
  // If no input is passed, then simply returns the list of requirements
  (): { [key: string]: number };
  // if input is passed, then returns nothing. Just update the list internally.
  (input: { [key: string]: number }): void;
};

// This method add required items to the recipes for it to process correctly.
export const recipesEntryCommandsRequiredFactory: RecipesEntryCommandRequiredFactory = ({ commands, data }) => {
  const requiredFunction: any = (input?: { [key: string]: number }) => {
    // Making sure data required exists
    if (!data.required) data.required = {};

    if (isUndefined(input)) return data.required;

    // Merging data required with the input
    objectUpdate(data.required, input);
  };

  return requiredFunction;
};
