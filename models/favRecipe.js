import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const favRecipeSchema = new Schema({
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  favDate: Date,
});

export default mongoose.model('FavRecipe', favRecipeSchema);
