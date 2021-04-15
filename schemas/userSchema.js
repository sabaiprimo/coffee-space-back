import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  extend type Query {
    users: [User]
    user(id: ID!): User
  }

  type User {
    email: String
    password: String
    firstName: String
    lastName: String
    displayName: String
  }

  extend type Mutation {
    addUser(
      email: String
      password: String
      firstName: String
      lastName: String
      displayName: String
    ): User
  }
`;
