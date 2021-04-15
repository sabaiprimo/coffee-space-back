import { gql } from 'apollo-server-express';

export default gql`
  type favArticle {
    articles: [Article]
    userID: User
    favDate: Date
  }

  extend type Query {
    favArticles: [favArticles]
  }

  #   extend type Mutation {
  #     addLevel(
  #       Comment: String
  #       IsFastChargeCapable: Boolean
  #       Title: String
  #     ): Level
  #   }
`;
