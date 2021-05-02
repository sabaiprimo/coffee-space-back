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
    isFeatured: Boolean
  }

  type coverImage {
    src: String
  }

  input coverImageInput {
    src: String
  }

  type contentItem {
    text: String
    images: [String]
  }
  input contentItemInput {
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
    articles(filter: ArticleFilters, limit: Int, start: Int): [Article]
    articlesByIDs(_ids: [ID]): [Article]
    articleLatest(limit: Int, start: Int): [Article]
    article(_id: ID!): Article
    popularArticle: [Article]
    myArticle(userID: ID!, limit: Int, start: Int): [Article]
    featureArticle(limit: Int): [Article]
    similarArticle(limit: Int, articleID: ID): [Article]
    countArticle(filter: ArticleFilters): Int
    countMyArticle(userID: ID!): Int
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
      cover: coverImageInput
      content: [contentItemInput]
      issueDate: DateTime
      tags: [String]
    ): Article
    deleteArticle(articleID: ID!): Article
  }
`;
