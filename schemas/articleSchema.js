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

  input coverImageInput {
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
  input contentItemInput {
    textNumber: Int
    text: String
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
    article(id: ID!): Article
  }

  extend type Mutation {
    addArticle(
      title: String
      subtitle: String
      headline: String
      author: ID!
      cover: coverImageInput
      images: [String]
      content: [contentItemInput]
      issueDate: DateTime
      tags: [String]
    ): Article
    modifyArticle(
      id: ID!
      title: String
      subtitle: String
      headline: String
      author: ID!
      cover: coverImageInput
      images: [String]
      content: [contentItemInput]
      issueDate: DateTime
      tags: [String]
    ): Article
  }
`;
