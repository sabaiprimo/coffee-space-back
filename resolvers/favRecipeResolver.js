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
  Mutation: {
    // Add FavRecipe: create new FavRecipe
    addFavRecipe: (parent, args) => {
      console.log('FavRecipe Resolver, addFavRecipe', args);
      const newFavRecipe = new FavRecipe(args);
      return newFavRecipe.save();
    },
    // Edit FavRecipe: find FavRecipe by id and update
    modifyFavRecipe: async (parent, args) => {
      // if (!context.user) {
      //   throw new AuthenticationError('authication failed');
      // }
      return await FavRecipe.findByIdAndUpdate(
        args.id,
        {
          ...args,
        },
        { new: true }
      );
    },
  },
};
