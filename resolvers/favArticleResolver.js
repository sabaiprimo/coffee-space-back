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

  /* Mutation favArticle
    Add favArticle: create new favArticle
    Edit favArticle: find favArticle by user id and update

   */
};
