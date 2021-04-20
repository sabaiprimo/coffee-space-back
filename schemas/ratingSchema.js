import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  type Rating {
    id: ID
    recipeID: Recipe
    userId: User
    rating: Int
  }

  type avgRating {
    _id: ID
    rating: Float
  }

  extend type Query {
    ratings: [Rating]
    ratingRecipeByUser(userID: ID, recipeID: ID): Rating
    avgRatingRecipe(recipeID: ID): avgRating
  }

  extend type Mutation {
    addRating(recipeID: ID!, userId: ID!, rating: Int!): Rating
    modifyRating(id: ID!, rating: Int!): Rating
  }
`;
