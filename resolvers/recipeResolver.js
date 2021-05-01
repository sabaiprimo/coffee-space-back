import Recipe from '../models/recipe.js';

export default {
  FavRecipe: {
    recipe(parent) {
      return Recipe.findById(parent.recipe);
    },
  },
  Query: {
    recipes: async (parent, args, context, info) => {
      const { filter, title } = args;

      const shouldApplyFilters = filter ? filter : false;
      const shouldApplyTitleSearch = title ? title : false;

      if (!shouldApplyFilters && !shouldApplyTitleSearch) {
        return await Recipe.find();
      }

      if (shouldApplyTitleSearch) {
        const name = title;
        const regex = new RegExp(name, 'i'); // i for case insensitive
        return filter
          ? await Recipe.find({ ...filter, title: { $regex: regex } })
          : await Recipe.find({ title: { $regex: regex } });
      }
      console.log(filter);
      return await Recipe.find(filter);
    },
    // for future use
    recommendRecipe: async (parent, args, context, info) => {
      const { limit, recipeID } = args;

      return await Recipe.find({ _id: { $ne: recipeID } }).limit(limit);
    },
    recipe: async (parent, args, context, info) => {
      const { _id } = args;
      console.log(_id);
      return await Recipe.findById(_id);
    },
    myRecipe: async (parent, args, context, info) => {
      const { userID } = args;
      console.log(userID);
      return await Recipe.find({ author: userID });
    },
    countRecipe: async (parent, args, context, info) => {
      return await Recipe.find().count();
    },
    countMyRecipe: async (parent, args, context, info) => {
      const { userID } = args;
      console.log(userID);
      return await Recipe.find({ author: userID }).count();
    },
  },
  Mutation: {
    addRecipe: (parent, args) => {
      console.log('Recipe Resolver, addRecipe', args);
      const newRecipe = new Recipe(args);
      return newRecipe.save();
    },
    modifyRecipe: async (parent, args) => {
      // if (!context.user) {
      //   throw new AuthenticationError('authication failed');
      // }
      return await Recipe.findByIdAndUpdate(
        args._id,
        {
          ...args,
        },
        { new: true }
      );
    },
  },
  /* Mutation Recipe
    Add recipe: create new Recipe
    Edit recipe: find recipe by id and update

   */
};
