import { gql } from 'apollo-server-express';

export default gql`
  type favRecipe {
    recipes: [Recipe]
    userID: User
    favDate: Date
  }

  extend type Query {
    favRecipes: [favRecipes]
  }

  #   extend type Mutation {
  #     addLevel(
  #       Comment: String
  #       IsFastChargeCapable: Boolean
  #       Title: String
  #     ): Level
  #   }
`;
