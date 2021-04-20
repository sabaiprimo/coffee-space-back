import Rating from '../models/rating.js';

export default {
  Query: {
    ratings: () => {
      return Rating.find();
    },
    ratingRecipeByUser: async (args) => {
      const { userID, recipeID } = args;
      return await Rating.find({ userID: userID, recipeID: recipeID }).pop();
    },
    avgRatingRecipe: async (args) => {
      const { recipeID } = args;
      const avgRating = await Rating.aggregate([
        {
          $group: {
            _id: '$recipeID',
            avgRating: { $avg: '$rating' },
          },
        },
      ]);

      return await avgRating.filter((rating) => rating._id === recipeID);
    },
  },
  Mutation: {
    addRating: (parent, args) => {
      console.log('Rating Resolver, addRating', args);
      const newRating = new Rating(args);
      return newRating.save();
    },
    modifyRating: async (parent, args) => {
      // if (!context.user) {
      //   throw new AuthenticationError('authication failed');
      // }
      return await Rating.findByIdAndUpdate(
        args.id,
        {
          ...args,
        },
        { new: true }
      );
    },
  },
};
