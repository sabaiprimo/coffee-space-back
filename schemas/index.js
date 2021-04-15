import { gql } from 'apollo-server-express';
import recipeSchema from './recipeSchema.js';
import favRecipeSchema from './favRecipeSchema.js';
import favArticleSchema from './favArticleSchema.js';
import commentSchema from './commentSchema.js';
import ratingSchema from './ratingSchema.js';
import userSchema from './userSchema.js';
import articleSchema from './articleSchema.js';
import { DateTimeTypeDefinition } from 'graphql-scalars';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [
  DateTimeTypeDefinition,
  linkSchema,
  recipeSchema,
  favRecipeSchema,
  favArticleSchema,
  commentSchema,
  ratingSchema,
  userSchema,
  articleSchema,
];
