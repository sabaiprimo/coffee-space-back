import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  type Rating {
    recipeID: Recipe
    userId: User
    rating: Int
  }

  extend type Query {
    ratings: [rating]
  }

  #   extend type Mutation {
  #     addLevel(
  #       Comment: String
  #       IsFastChargeCapable: Boolean
  #       Title: String
  #     ): Level
  #   }
`;
