import FavRecipe from '../models/favRecipe.js';

export default {
  Query: {
    favRecipes: () => {
      return FavRecipe.find();
    },
    favRecipe: (parent, args) => {
       const { userid } = args;
      return await FavRecipe.find((favrecipe) => favrecipe.userID === userid);
    },
  },
};
