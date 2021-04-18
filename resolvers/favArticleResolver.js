import FavArticle from '../models/favArticle.js';

export default {
  Query: {
    favArticles: () => {
      return FavArticle.find();
    },
    favArticle: (parent, args) => {
       const { userid } = args;
      return await FavArticle.find((favarticle) => favarticle.userID === userid);
    },
  },
};
