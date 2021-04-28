import Recipe from '../models/recipe.js';

export default {
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
    recipe: async (parent, args, context, info) => {
      const { _id } = args;
      console.log(_id);
      return await Recipe.findById(_id);
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
