import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    recipes: [Recipe]
    recipe(id: ID!): Recipe
  }

  type Recipe {
    title: String
    description: String
    preparationTime: String
    totalTime: String
    serving: Int
    roastLevel: String
    level: String
    ingredient: String
    equipment: String
    directions: [Direction]
  }

  type Direction {
    step: Int
    content: String
  }

  input DirectionInput {
    step: Int
    content: String
  }

  extend type Mutation {
    addRecipe(
      title: String
      description: String
      preparationTime: String
      totalTime: String
      serving: Int
      roastLevel: String
      level: String
      ingredient: String
      equipment: String
      directions: [DirectionInput]
    ): Recipe
    modifyRecipe(
      id: ID!
      title: String
      description: String
      preparationTime: String
      totalTime: String
      serving: Int
      roastLevel: String
      level: String
      ingredient: String
      equipment: String
      directions: [DirectionInput]
    ): Recipe
  }
`;
