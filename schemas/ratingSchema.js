import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  type Rating {
    id: ID
    recipeID: Recipe
    userId: User
    rating: Int
  }

  extend type Query {
    ratings: [Rating]
  }

  extend type Mutation {
    addRating(recipeID: ID!, userId: ID!, rating: Int!): Rating
    editRating(id: ID!, rating: Int!): Rating
  }
`;
