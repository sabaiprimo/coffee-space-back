import FavRecipe from '../models/favRecipe.js';

export default {
  Query: {
    favRecipes: () => {
      return FavRecipe.find();
    },
    favRecipe: async (parent, args) => {
      const { userid } = args;
      return await FavRecipe.find((favrecipe) => favrecipe.userID === userid);
    },
  },

  /* Mutation favRecipe
    Add favRecipe: create new favRecipe
    Edit favRecipe: find favRecipe by user id and update

   */
};
