import Rating from '../models/rating.js';

export default {
  Query: {
    ratings: () => {
      return Rating.find();
    },
    rateRecipe: async (parent, args) => {
      const { userID, recipeID } = args;

      return await Rating.findOne({ user: userID, recipe: recipeID });
    },
    avgRatingRecipe: async (parent, args) => {
      const { recipeID } = args;
      const avgRatings = await Rating.aggregate([
        {
          $group: {
            _id: '$recipe',
            avgRate: { $avg: '$rating' },
            reviews: { $sum: 1 },
          },
        },
      ]);

      return await avgRatings.find((avgRating) => avgRating._id == recipeID);
    },
  },
  Mutation: {
    addRating: (parent, args) => {
      const newRating = new Rating(args);
      return newRating.save();
    },
    modifyRating: async (parent, args) => {
      // if (!context.user) {
      //   throw new AuthenticationError('authication failed');
      // }
      return await Rating.findByIdAndUpdate(
        args._id,
        {
          ...args,
        },
        { new: true }
      );
    },
  },
};
