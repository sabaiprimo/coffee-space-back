import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  type Comment {
    id: ID
    recipeID: Recipe
    userId: User
    context: String
    commentDate: DateTime
  }

  extend type Query {
    comments: [Comment]
  }

  extend type Mutation {
    addComment(
      recipeID: ID
      userId: ID
      context: String
      commentDate: DateTime
    ): Comment
    editComment(
      id: ID!
      recipeID: ID
      userId: ID
      context: String
      commentDate: DateTime
    ): Comment
  }
`;
