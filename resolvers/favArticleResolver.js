import FavArticle from '../models/favArticle.js';

export default {
  Query: {
    favArticles: () => {
      return FavArticle.find();
    },
  },
};
