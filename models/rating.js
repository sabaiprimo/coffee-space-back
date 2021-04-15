import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  recipeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
});

export default mongoose.model('Rating', ratingSchema);
