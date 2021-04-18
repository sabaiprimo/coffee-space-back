import { gql } from 'apollo-server-express';

export default gql`
  type favRecipe {
    id: ID
    recipes: [Recipe]
    userID: User
    favDate: DateTime
  }

  extend type Query {
    favRecipes: [favRecipe]
    favRecipe(userid: ID!): faveRecipe
  }

  #   extend type Mutation {
  #     addLevel(
  #       Comment: String
  #       IsFastChargeCapable: Boolean
  #       Title: String
  #     ): Level
  #   }
`;
