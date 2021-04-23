import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  extend type Query {
    users: [User]
    user(id: ID!): User
    login(username: String!, password: String!): User
  }

  type User {
    _id: ID
    email: String
    password: String
    firstName: String
    lastName: String
    displayName: String
  }

  extend type Mutation {
    registerUser(
      email: String
      password: String
      firstName: String
      lastName: String
      displayName: String
    ): User
  }
`;
