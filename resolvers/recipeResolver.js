import Rating from '../models/rating.js';
import FavRecipe from '../models/favRecipe.js';
import Recipe from '../models/recipe.js';

export default {
  FavRecipe: {
    recipe(parent) {
      return Recipe.findById(parent.recipe);
    },
  },
  Query: {
    recipes: async (parent, args, context, info) => {
      const { filter, title, limit, start } = args;

      const shouldApplyFilters = filter ? filter : false;
      const shouldApplyTitleSearch = title ? title : false;

      if (!shouldApplyFilters && !shouldApplyTitleSearch) {
        return await Recipe.find()
          .limit(limit ? limit : null)
          .skip(start ? start : null);
      }

      if (shouldApplyTitleSearch) {
        const name = title;
        const regex = new RegExp(name, 'i'); // i for case insensitive
        return filter
          ? await Recipe.find({ ...filter, title: { $regex: regex } })
              .limit(limit ? limit : null)
              .skip(start ? start : null)
          : await Recipe.find({ title: { $regex: regex } })
              .limit(limit ? limit : null)
              .skip(start ? start : null);
      }

      return await Recipe.find(filter)
        .limit(limit ? limit : null)
        .skip(start ? start : null);
    },
    // for future use
    recommendRecipe: async (parent, args, context, info) => {
      const { limit, recipeID } = args;

      return await Recipe.find({ _id: { $ne: recipeID } }).limit(limit);
    },
    recipe: async (parent, args, context, info) => {
      const { _id } = args;

      return await Recipe.findById(_id);
    },
    myRecipe: async (parent, args, context, info) => {
      const { userID, limit, start } = args;
      return await Recipe.find({ author: userID })
        .skip(start ? start : null)
        .limit(limit ? limit : null);
    },
    countRecipe: async (parent, args, context, info) => {
      return await Recipe.find().count();
    },
    countMyRecipe: async (parent, args, context, info) => {
      const { userID } = args;

      return await Recipe.find({ author: userID }).count();
    },
  },
  Mutation: {
    addRecipe: (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }
      const newRecipe = new Recipe(args);
      return newRecipe.save();
    },
    modifyRecipe: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('Unauthorized');
      }
      return await Recipe.findByIdAndUpdate(
        args._id,
        {
          ...args,
        },
        { new: true }
      );
    },
    deleteRecipe: async (parent, { recipeID }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError('Unauthorized');
        }
        await FavRecipe.deleteMany({ recipe: recipeID });
        await Rating.deleteMany({ recipe: recipeID });
        return await Recipe.findByIdAndDelete(recipeID);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  /* Mutation Recipe
    Add recipe: create new Recipe
    Edit recipe: find recipe by id and update

   */
};
