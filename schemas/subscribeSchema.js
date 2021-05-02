import pkg from 'apollo-server-express';
const { gql } = pkg;

export default gql`
  type Subscribe {
    _id: ID
    email: String
    isSub: Boolean
  }

  extend type Query {
    subscribes: [Subscribe]
  }
  extend type Mutation {
    addSubscribe(email: String): String
    modifySubscribe(_id: ID!, isSub: Boolean): String
  }
`;
