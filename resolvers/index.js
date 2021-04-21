// import stationResolver from './stationResolver.js';
import recipeResolver from './recipeResolver.js';
import favArticleResolver from './favArticleResolver.js';
import favRecipeResolver from './favRecipeResolver.js';
import commentResolver from './commentResolver.js';
import ratingResolver from './ratingResolver.js';
import userResolver from './userResolver.js';
import articleResolver from './articleResolver.js';
import { DateTimeResolver as DateTime } from 'graphql-scalars';

export default [
  { DateTime },
  recipeResolver,
  articleResolver,
  favArticleResolver,
  favRecipeResolver,
  commentResolver,
  ratingResolver,
  userResolver,
];
