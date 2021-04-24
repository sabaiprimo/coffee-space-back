import FavArticle from '../models/favArticle.js';

export default {
  Query: {
    favArticles: async () => {
      return await FavArticle.find();
    },
    favArticle: async (parent, args) => {
      const { userid } = args;
      return await FavArticle.find(
        (favarticle) => favarticle.userID === userid
      );
    },
  },
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
      return await FavArticle.findByIdAndUpdate(
        args.id,
        {
          ...args,
        },
        { new: true }
      );
    },
  },
  /* Mutation favArticle
    Add favArticle: create new favArticle
    Edit favArticle: find favArticle by user id and update

   */
};
