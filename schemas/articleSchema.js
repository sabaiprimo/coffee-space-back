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

  extend type Query {
    articles: [Article]
  }

  #   extend type Mutation {
  #     addLevel(
  #       Comment: String
  #       IsFastChargeCapable: Boolean
  #       Title: String
  #     ): Level
  #   }
`;
