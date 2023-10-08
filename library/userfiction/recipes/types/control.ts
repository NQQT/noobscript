import { RecipeDataType } from './data';
import { RecipeEntryCommandRequired } from '../entry/commands/required';
import { RecipeEntryCommandConsumes } from '../entry/commands/consumes';
import { RecipeEntryCommandProduces } from '../entry/commands/produces';

export type RecipeControlType = {
  (): { data: RecipeDataType };
  get: (id: string) => {
    // The required items for this recipe to works
    required: RecipeEntryCommandRequired;
    // What will be consumed when this recipe is executed.
    consumes: RecipeEntryCommandConsumes;
    // What will be produced when this recipe is executed.
    produces: RecipeEntryCommandProduces;
  };
};
