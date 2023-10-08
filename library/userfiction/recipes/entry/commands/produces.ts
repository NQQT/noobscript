import { recipeEntry } from '../index';
import { RecipesDescriptionType } from '../../types/data';
import { isUndefined } from '@library/presource/js/is/undefined';
import { objectUpdate } from '@library/presource/js/object/update';

export type RecipesEntryCommandProducesFactory = (input: {
  commands: ReturnType<typeof recipeEntry>;
  data: RecipesDescriptionType;
}) => RecipeEntryCommandProduces;

export type RecipeEntryCommandProduces = {
  // If no input is passed, returns the list of consumables.
  (): { [key: string]: number };
  // If input is passed, then returns nothing. Update the list internally.
  (input: { [key: string]: number }): void;
  // tslint:disable-next-line:unified-signatures
  (input: (current: { [key: string]: number }) => { [key: string]: number }): void;

  // Addvance function. Offseting something
  offset: (input: { [key: string]: number }) => void;
  // Overwriting current data with the rest.
  only: (input: { [key: string]: number }) => void;
};

// This meethod adds produces to the recipes for things that might be produced after creation.
export const recipesEntryCommandProducesFactory: RecipesEntryCommandProducesFactory = ({ commands, data }) => {
  const produceFunction: any = (input?: { [key: string]: number }) => {
    // Making sure data required exists
    if (!data.produces) data.produces = {};

    if (isUndefined(input)) return data.produces;

    // Merging data required with the input
    objectUpdate(data.produces, input);
  };

  objectUpdate(produceFunction, {
    offset: () => {
      // returns nothing here for now
    },
    only: () => {
      // returns nothing here for now
    },
  });

  // Return a merged consume function
  return produceFunction;
};
