import FavRecipe from '../models/favRecipe.js';

export default {
  Query: {
    favRecipes: () => {
      return FavRecipe.find();
    },
    myFavRecipe: async (parent, args) => {
      const { userID } = args;
      return await FavRecipe.find({ user: userID, isFav: true });
    },

    favRecipe: async (parent, args) => {
      const { userID, recipeID } = args;
      return await FavRecipe.findOne({ user: userID, recipe: recipeID });
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
      const favrecipe = await FavRecipe.findById({ _id: args._id });
      const isFaved = favrecipe.isFav;
      console.log('isFaved:', isFaved);
      return await FavRecipe.findByIdAndUpdate(
        args._id,
        {
          isFav: !isFaved,
        },
        { new: true }
      );
    },
  },
};
