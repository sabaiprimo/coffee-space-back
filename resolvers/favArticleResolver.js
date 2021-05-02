import FavArticle from '../models/favArticle.js';

export default {
  Query: {
    favArticles: async () => {
      const { userIDs } = args;
      return await FavArticle.find();
    },
    myFavArticle: async (parent, args) => {
      const { userID, limit, start } = args;
      return await FavArticle.find({ user: userID, isFav: true })
        .skip(start ? start : null)
        .limit(limit ? limit : null);
    },
    countFavArticle: async (parent, args) => {
      const { userID } = args;
      return await FavArticle.find({ user: userID, isFav: true }).count();
    },
    favArticle: async (parent, args) => {
      const { userID, articleID } = args;
      return await FavArticle.findOne({ user: userID, article: articleID });
    },
    sumFavArticle: async (parent, args) => {
      // const { recipeID } = args;
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

      console.log(popFavArticle);
      return popFavArticle;
    },
  },
  /* Mutation favArticle
    Add favArticle: create new favArticle
    Edit favArticle: find favArticle by user id and update

   */
  Mutation: {
    // Add favArticle: create new favArticle
    addFavArticle: (parent, args) => {
      console.log('FavArticle Resolver, addFavArticle', args);
      const newFavArticle = new FavArticle(args);
      return newFavArticle.save();
    },
    // Edit FavArticle: find FavArticle by id and update
    modifyFavArticle: async (parent, args) => {
      // if (!context.user) {
      //   throw new AuthenticationError('authication failed');
      // }
      const favArticle = await FavArticle.findById({ _id: args._id });
      const isFaved = favArticle.isFav;
      return await FavArticle.findByIdAndUpdate(
        args._id,
        {
          isFav: !isFaved,
        },
        { new: true }
      );
    },
  },
};
