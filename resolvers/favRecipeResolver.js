import FavRecipe from '../models/favRecipe.js';

export default {
  Query: {
    favRecipes: () => {
      return FavRecipe.find();
    },
  },
};
