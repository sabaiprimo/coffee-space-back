import { gql } from 'apollo-server-express';

export default gql`
  type Article {
    _id: ID
    title: String
    subtitle: String
    headline: String
    author: User
    cover: coverImage
    content: [contentItem]
    issueDate: DateTime
    tags: [String]
  }

  type coverImage {
    src: String
  }

  input coverImageInput {
    src: String
  }

  type contentItem {
    textNumber: Int
    text: String
    images: [String]
  }
  input contentItemInput {
    textNumber: Int
    text: String
    images: [String]
  }

  input ArticleFilters {
    tags: [String]
    title: String
  }

  # input ArticleInput {
  #   filter: ArticleFilters
  # }

  extend type Query {
    articles(filter: ArticleFilters): [Article]
    article(_id: ID!): Article
  }

  extend type Mutation {
    addArticle(
      title: String
      subtitle: String
      headline: String
      author: ID!
      cover: coverImageInput
      content: [contentItemInput]
      issueDate: DateTime
      tags: [String]
    ): Article
    modifyArticle(
      _id: ID!
      title: String
      subtitle: String
      headline: String
      author: ID!
      cover: coverImageInput

      content: [contentItemInput]
      issueDate: DateTime
      tags: [String]
    ): Article
  }
`;
