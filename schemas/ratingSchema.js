import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  type Rating {
    _id: ID
    recipe: Recipe
    user: User
    rating: Int
  }

  type avgRating {
    _id: ID
    avgRate: Float
  }

  extend type Query {
    ratings: [Rating]
    rateRecipe(userID: ID!, recipeID: ID!): Rating
    avgRatingRecipe(recipeID: ID): avgRating
  }

  extend type Mutation {
    addRating(recipe: ID!, user: ID!, rating: Int!): Rating
    modifyRating(_id: ID!, rating: Int!): Rating
  }
`;
