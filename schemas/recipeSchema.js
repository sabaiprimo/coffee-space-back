import { gql } from 'apollo-server-express';

export default gql`
  type Recipe {
    _id: ID
    title: String
    description: String
    preparationTime: Float
    totalTime: Float
    serving: Int
    roastLevel: String
    level: String
    ingredients: [String]
    equipments: [String]
    directions: [Direction]
    author: User
    images: [Image]
    issueDate: DateTime
  }

  type Image {
    src: String
    srcSet: String
  }

  input ImageInput {
    src: String
    srcSet: String
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
    recipe(_id: ID!): Recipe
    myRecipe(userID: ID!, limit: Int): [Recipe]
    countRecipe(userID: ID!): Int
    countMyRecipe(userID: ID!): Int
    recommendRecipe(limit: Int, recipeID: ID): [Recipe]
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
      ingredients: [String]
      equipments: [String]
      directions: [DirectionInput]
      author: ID!
      images: [ImageInput]
    ): Recipe
    modifyRecipe(
      _id: ID!
      title: String
      description: String
      preparationTime: Float
      totalTime: Float
      serving: Int
      roastLevel: String
      level: String
      ingredients: [String]
      equipments: [String]
      directions: [DirectionInput]
      images: [ImageInput]
      issueDate: DateTime
    ): Recipe
  }
`;
