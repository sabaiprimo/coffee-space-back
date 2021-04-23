import { gql } from 'apollo-server-express';

export default gql`
  type Recipe {
    title: String
    description: String
    preparationTime: Float
    totalTime: Float
    serving: Int
    roastLevel: String
    level: String
    ingredient: String
    equipment: String
    directions: [Direction]
    author: User
    images: [String]
  }

  type Direction {
    step: Int
    content: String
  }

  input DirectionInput {
    step: Int
    content: String
  }

  input RecipeFilters {
    preparationTime: Float
    totalTime: Float
    serving: Int
    roastLevel: String
    level: String
  }

  # input RecipeInput {
  #   filter: RecipeFilters
  # }

  extend type Query {
    recipes(filter: RecipeFilters, title: String): [Recipe]
    recipe(id: ID!): Recipe
  }

  extend type Mutation {
    addRecipe(
      title: String
      description: String
      preparationTime: Float
      totalTime: Float
      serving: Int
      roastLevel: String
      level: String
      ingredient: String
      equipment: String
      directions: [DirectionInput]
      author: ID!
      images: [String]
    ): Recipe
    modifyRecipe(
      id: ID!
      title: String
      description: String
      preparationTime: Float
      totalTime: Float
      serving: Int
      roastLevel: String
      level: String
      ingredient: String
      equipment: String
      directions: [DirectionInput]
      author: ID!
      images: [String]
    ): Recipe
  }
`;
