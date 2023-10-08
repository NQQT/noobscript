export type RecipeDataType = {
  // The list of items that available within this recipes
  list: {
    [key: string]: RecipesDescriptionType;
  };
};

// The descriptions of the recipes
export type RecipesDescriptionType = {
  id: string;
  // Items must be required for recipes, but does not consume. Usually pots and pans, maybe?
  required?: { [key: string]: number };
  // Items that are consumed during the transformation. Most recipes are one way only!
  consumes?: { [key: string]: number };
  // Itesm that are produces during the transformation. Most recipes are one way only!
  produces?: { [key: string]: number };
};
