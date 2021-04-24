import { gql } from 'apollo-server-express';

export default gql`
  type favArticle {
    _id: ID
    articles: [Article]
    userID: User
    favDate: DateTime
  }

  extend type Query {
    favArticles: [favArticle]
    favArticle(id: ID!): favArticle
  }

  extend type Mutation {
    addFavArticle(userID: ID!, articles: [ID]): favArticle
    modifyFavArticle(id: ID!, articles: [ID]): favArticle
  }
`;
