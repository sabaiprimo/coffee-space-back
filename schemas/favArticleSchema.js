import { gql } from 'apollo-server-express';

export default gql`
  type FavArticle {
    _id: ID
    article: Article
    user: User
    isFav: Boolean
    favDate: DateTime
  }

  extend type Query {
    favArticles: [FavArticle]
    myFavArticle(userID: ID!): [FavArticle]
    favArticle(recipeID: ID!, userID: ID!): FavArticle
  }

  extend type Mutation {
    addFavArticle(user: ID!, recipe: ID): FavArticle
    modifyFavArticle(_id: ID!): FavArticle
  }
`;
