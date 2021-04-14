import Recipe from '../models/recipe.js';

export default {
  Query: {
    recipes: () => {
      return Recipe.find();
    },
  },
};
