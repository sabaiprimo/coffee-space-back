import Article from '../models/article.js';

export default {
  Query: {
    articles: async (parent, args, context, info) => {
      const { filter } = args;
      const shouldApplyFilters = filter !== null;

      if (!shouldApplyFilters) {
        return await Article.find();
      }

      const shouldApplyTag = filter.tags !== null;
      const shouldApplyName = filter.title !== null;

      if (shouldApplyTag) {
        return await Article.find({tags: { "$in" : filter.tags]} })
      }

      if (shouldApplyName) {
        const name = filter.title;
        const regex = new RegExp(name, 'i'); // i for case insensitive
        return await Article.find({ title: { $regex: regex } });
      }

    return await Article.find();
    },
    article: async (parent, args, context, info) => {
      const { id } = args;
      return await Article.find((article) => article.id === id);
    },
  },
};
