import { gql } from 'apollo-server-express';

export default gql`
  type favArticle {
    id: ID
    articles: [Article]
    userID: User
    favDate: DateTime
  }

  extend type Query {
    favArticles: [favArticle]
    favArticle(id: ID!): favArticle
  }

  #   extend type Mutation {
  #     addLevel(
  #       Comment: String
  #       IsFastChargeCapable: Boolean
  #       Title: String
  #     ): Level
  #   }
`;
