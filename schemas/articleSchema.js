import { gql } from 'apollo-server-express';

export default gql`
  type Article {
    id: ID
    title: String
    subtitle: String
    headline: String
    author: User
    cover: coverImage
    images: [image]
    content: [contentItem]
    issueDate: DateTime
    tags: [String]
  }

  type coverImage {
    src: String
  }

  type image {
    src: String
    textNumber: Int
  }

  type contentItem {
    textNumber: Int
    text: String
  }

  type ArticleFilters {
    tags: [String]
    title: String
  }

  type ArticleInput {
    filter: ArticleFilters
  }

  extend type Query {
    articles(input: ArticleInput): [Article]
    article(id: ID!): Article
  }

  #   extend type Mutation {
  #     addLevel(
  #       Comment: String
  #       IsFastChargeCapable: Boolean
  #       Title: String
  #     ): Level
  #   }
`;
