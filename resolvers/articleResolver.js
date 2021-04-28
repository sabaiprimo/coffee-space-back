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
        return await Article.find({ tags: { $in: filter.tags } });
      }

      if (shouldApplyName) {
        const name = filter.title;
        const regex = new RegExp(name, 'i'); // i for case insensitive
        return await Article.find({ title: { $regex: regex } });
      }

      return await Article.find();
    },
    article: async (parent, args, context, info) => {
      const { _id } = args;
      return await Article.findById(_id);
    },
  },
  Mutation: {
    // Add article: create new article
    addArticle: (parent, args) => {
      console.log('article Resolver, addArticle', args);
      const newArticle = new Article(args);
      return newArticle.save();
    },
    // Edit article: find article by id and update
    modifyArticle: async (parent, args) => {
      // if (!context.user) {
      //   throw new AuthenticationError('authication failed');
      // }
      return await Article.findByIdAndUpdate(
        args.id,
        {
          ...args,
        },
        { new: true }
      );
    },
  },
};
