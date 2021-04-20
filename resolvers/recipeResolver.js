import Recipe from '../models/recipe.js';

export default {
  Query: {
    recipes: async (parent, args, context, info) => {
      const { filter, title } = args;
      const shouldApplyFilters = filter !== null;
      const shouldApplyTitleSearch = title !== null;

      if (!shouldApplyFilters && !shouldApplyTitleSearch) {
        return await Recipe.find();
      }

      if (shouldApplyTitleSearch) {
        const name = filter.title;
        const regex = new RegExp(name, 'i'); // i for case insensitive
        return filter
          ? await Recipe.find({ title: { $regex: regex } }).where(filter)
          : await Recipe.find({ title: { $regex: regex } });
      }
      return await Recipe.find().where(filter);
    },
    recipe: async (parent, args, context, info) => {
      const { id } = args;
      return await recipe.find((recipe) => recipe.id === id).pop();
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
        args.id,
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
