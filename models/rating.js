import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  recipeID: String,
  userId: String,
  rating: Number,
});

export default mongoose.model('Rating', ratingSchema);
