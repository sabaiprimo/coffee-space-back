import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  type Comment {
    _id: ID
    recipeID: Recipe
    userID: User
    context: String
    commentDate: DateTime
  }

  extend type Query {
    comments(recipeID: ID): [Comment]
    comment(_id: ID!): Comment
  }

  extend type Mutation {
    addComment(recipeID: ID, userID: ID, context: String): Comment
    modifyComment(_id: ID!, recipeID: ID, userID: ID, context: String): Comment
  }
`;
