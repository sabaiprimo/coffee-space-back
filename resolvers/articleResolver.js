import Article from '../models/article.js';
import FavArticle from '../models/favArticle.js';

export default {
  FavArticle: {
    article(parent) {
      return Article.findById(parent.article);
    },
  },
  Query: {
    articles: async (parent, args, context, info) => {
      const { filter, limit, start } = args;
      const shouldApplyFilters = filter !== null;

      if (!shouldApplyFilters) {
        return await Article.find()
          .skip(start ? start : null)
          .limit(limit ? limit : null);
      }

      const shouldApplyTag = filter.tags ? true : false;
      const shouldApplyName = filter.title ? true : false;

      if (shouldApplyTag) {
        return await Article.find({ tags: { $in: filter.tags } })
          .skip(start ? start : null)
          .limit(limit ? limit : null);
      }

      if (shouldApplyName) {
        const name = filter.title;
        const regex = new RegExp(name, 'i'); // i for case insensitive
        return await Article.find({ title: { $regex: regex } })
          .skip(start ? start : null)
          .limit(limit ? limit : null);
      }

      return await Article.find()
        .skip(start ? start : null)
        .limit(limit ? limit : null);
    },
    articlesByIDs: async (parent, args, context, info) => {
      const { _ids } = args;
      return await Article.find().where('_id').in(_ids);
    },
    articleLatest: async (parent, args, context, info) => {
      const { limit, start } = args;
      return await Article.find()
        .sort({ issueDate: 'desc' })
        .skip(start ? start : null)
        .limit(limit ? limit : null);
    },
    article: async (parent, args, context, info) => {
      const { _id } = args;
      return await Article.findById(_id);
    },
    myArticle: async (parent, args, context, info) => {
      const { userID, limit, start } = args;
      return await Article.find({ author: userID })
        .skip(start ? start : null)
        .limit(limit ? limit : null);
    },
    popularArticle: async (parent, args, context, info) => {
      const popFavArticle = await FavArticle.aggregate([
        {
          $match: { isFav: true },
        },
        {
          $group: {
            _id: '$article',
            totalLike: { $sum: 1 },
          },
        },
        { $sort: { totalLike: -1 } },
        {
          $limit: 6,
        },
      ]);
      let idToQuery = [];
      popFavArticle.forEach((item, idx) => idToQuery.push(item._id));
      return await Article.find().where('_id').in(idToQuery);
    },
    featureArticle: async (parent, args, context, info) => {
      const { limit } = args;
      return limit
        ? await Article.find({ isFeatured: true }).limit(limit)
        : await Article.find({ isFeatured: true });
    },
    similarArticle: async (parent, args, context, info) => {
      const { limit, articleID } = args;
      return await Article.find({ _id: { $ne: articleID } }).limit(
        limit ? limit : null
      );
    },
    countArticle: async (parent, args, context, info) => {
      const { filter } = args;
      const shouldApplyFilters = filter ? true : false;

      if (!shouldApplyFilters) {
        return await Article.find().count();
      }

      const shouldApplyTag = filter.tags ? true : false;
      const shouldApplyName = filter.title ? true : false;

      if (shouldApplyTag) {
        return await Article.find({ tags: { $in: filter.tags } }).count();
      }

      if (shouldApplyName) {
        const name = filter.title;
        const regex = new RegExp(name, 'i'); // i for case insensitive
        return await Article.find({ title: { $regex: regex } }).count();
      }

      return await Article.find().count();
    },
    countMyArticle: async (parent, args, context, info) => {
      const { userID } = args;
      return await Article.find({ author: userID }).count();
    },
  },
  Mutation: {
    // Add article: create new article
    addArticle: (parent, args) => {
      const newArticle = new Article(args);
      return newArticle.save();
    },
    // Edit article: find article by id and update
    modifyArticle: async (parent, args) => {
      // if (!context.user) {
      //   throw new AuthenticationError('authication failed');
      // }
      return await Article.findByIdAndUpdate(
        args._id,
        {
          ...args,
        },
        { new: true }
      );
    },
    deleteArticle: async (parent, { articleID }, { user }) => {
      try {
        if (!user) {
          throw new AuthenticationError('Unauthorized');
        }
        await FavArticle.deleteMany({ article: articleID });
        return await Article.findByIdAndDelete(articleID);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
