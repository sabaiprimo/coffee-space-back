import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  extend type Query {
    me: User
    users: [User]
    user(email: String): User
    login(email: String!, password: String!): User
  }

  type User {
    _id: ID
    email: String
    password: String
    firstName: String
    lastName: String
    displayName: String
    pictureProfile: String
    token: String
  }

  extend type Mutation {
    register(
      email: String
      password: String
      firstName: String
      lastName: String
      displayName: String
    ): String
    changePassword(_id: ID, oldPassword: String, newPassword: String): User
    modifyUser(
      _id: ID
      firstName: String
      lastName: String
      displayName: String
      pictureProfile: String
    ): User
    resetPassword(_id: ID, password: String): User
  }
`;
