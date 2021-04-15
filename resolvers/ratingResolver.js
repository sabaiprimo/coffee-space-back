import Rating from '../models/rating.js';

export default {
  Query: {
    ratings: () => {
      return Rating.find();
    },
  },
};
