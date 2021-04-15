import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  type Comment {
    recipeID: Recipe
    userId: User
    context: String
    commentDate: Date
  }

  extend type Query {
    comments: [comment]
  }

  extend type Mutation {
    addComment(
      recipeID: ID
      userId: ID
      context: String
      commentDate: Date
    ): Comment
    editComment(
      id: ID!
      recipeID: ID
      userId: ID
      context: String
      commentDate: Date
    ): Comment
  }
`;
