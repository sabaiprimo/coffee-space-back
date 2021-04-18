import Recipe from '../models/recipe.js';

export default {
  Query: {
    // recipes: () => {
    //   return Recipe.find();
    // },
    recipes: async (parent, args, context, info) => {
      const { filter } = args;
      const shouldApplyFilters = filter !== null;

      if (!shouldApplyFilters) {
        return await Recipe.find();
      }

      // const shouldApplyTag = filter.tags !== null;
      const shouldApplyName = filter.title !== null;

      // if (shouldApplyTag) {
      //   return await Recipe.find({tags: { "$in" : filter.tags]} })
      // }

      if (shouldApplyName) {
        const name = filter.title;
        const regex = new RegExp(name, 'i'); // i for case insensitive
        return await Recipe.find({ title: { $regex: regex } });
      }

      return await Recipe.find();
    },
  },
};
