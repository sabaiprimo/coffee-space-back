import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const favoriteRecipeSchema = new Schema({
  recipeID: String,
  userId: String,
});

export default mongoose.model('FavoriteRecipe', favoriteRecipeSchema);
