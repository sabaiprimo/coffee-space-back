import FavRecipe from '../models/favRecipe.js';

export default {
  Query: {
    favRecipes: () => {
      return FavRecipe.find();
    },
    myFavRecipe: async (parent, args) => {
      const { userID, limit, start } = args;
      return await FavRecipe.find({ user: userID, isFav: true })
        .skip(start ? start : null)
        .limit(limit ? limit : null);
    },
    countFavRecipe: async (parent, args) => {
      const { userID } = args;
      return await FavRecipe.find({ user: userID, isFav: true }).count();
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
    addFavRecipe: (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }
      const newFavRecipe = new FavRecipe(args);
      return newFavRecipe.save();
    },
    // Edit FavRecipe: find FavRecipe by id and update
    modifyFavRecipe: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }
      const favrecipe = await FavRecipe.findById({ _id: args._id });
      const isFaved = favrecipe.isFav;

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
