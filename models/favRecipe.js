import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const favRecipeSchema = new Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  favDate: { type: Date, default: Date.now },
  isFav: { type: Boolean, default: true },
});

export default mongoose.model('FavRecipe', favRecipeSchema);
