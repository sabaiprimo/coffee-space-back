import { gql } from 'apollo-server-express';

export default gql`
  type FavArticle {
    _id: ID
    article: Article
    user: User
    isFav: Boolean
    favDate: DateTime
  }
  type aggFavArticle {
    _id: Article
    totalLike: Int
  }
  extend type Query {
    favArticles: [FavArticle]
    myFavArticle(userID: ID!, limit: Int, start: Int): [FavArticle]
    favArticle(articleID: ID!, userID: ID!): FavArticle
    sumFavArticle: [aggFavArticle]
    countFavArticle(userID: ID!): Int
  }

  extend type Mutation {
    addFavArticle(user: ID!, article: ID!): FavArticle
    modifyFavArticle(_id: ID!): FavArticle
  }
`;
