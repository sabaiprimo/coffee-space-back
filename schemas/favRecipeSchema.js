import { gql } from 'apollo-server-express';

export default gql`
  type favRecipe {
    _id: ID
    recipes: [Recipe]
    userID: User
    favDate: DateTime
  }

  extend type Query {
    favRecipes: [favRecipe]
    favRecipe(userid: ID!): favRecipe
  }

  extend type Mutation {
    addFavRecipe(userID: ID!, recipes: [ID]): favRecipe
    editFavRecipe(id: ID!, recipes: [ID]): favRecipe
  }
`;
