import { gql } from 'apollo-server-express';

export default gql`
  type FavRecipe {
    _id: ID
    recipe: Recipe
    user: User
    isFav: Boolean
    favDate: DateTime
  }

  extend type Query {
    favRecipes: [FavRecipe]
    myFavRecipe(userID: ID!): [FavRecipe]
    favRecipe(recipeID: ID!, userID: ID!): FavRecipe
  }

  extend type Mutation {
    addFavRecipe(user: ID!, recipe: ID): FavRecipe
    modifyFavRecipe(_id: ID!): FavRecipe
  }
`;
