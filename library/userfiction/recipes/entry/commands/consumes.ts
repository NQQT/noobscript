import { recipeEntry } from '../index';
import { RecipesDescriptionType } from '../../types/data';
import { objectUpdate } from '@library/presource/js/object/update';
import { isUndefined } from '@library/presource/js/is/undefined';

export type RecipesEntryCommandConsumesFactory = (input: {
  commands: ReturnType<typeof recipeEntry>;
  data: RecipesDescriptionType;
}) => RecipeEntryCommandConsumes;

export type RecipeEntryCommandConsumes = {
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

// this method add consumes to the list of items that will be consumed when executed.
export const recipesEntryCommandsConsumesFactory: RecipesEntryCommandConsumesFactory = ({ commands, data }) => {
  const consumeFunction: any = (input?: { [key: string]: number }) => {
    // Making sure data required exists
    if (!data.consumes) data.consumes = {};

    if (isUndefined(input)) return data.consumes;

    // Merging data required with the input
    objectUpdate(data.consumes, input);
  };

  objectUpdate(consumeFunction, {
    offset: () => {
      // Returns nothing here for now
    },
    only: () => {
      // Returns nothing here for now
    },
  });

  // Return a merged consume function
  return consumeFunction;
};
