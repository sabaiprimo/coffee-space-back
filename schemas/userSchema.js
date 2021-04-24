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
    pictureProfile: String
  }

  extend type Mutation {
    register(
      email: String
      password: String
      firstName: String
      lastName: String
      displayName: String
    ): User
    updateUser(
      _id: ID
      firstName: String
      lastName: String
      displayName: String
      pictureProfile: String
    ): User
    resetPassword(_id: ID, password: String): User
  }
`;
