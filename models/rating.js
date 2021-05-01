import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  rateDate: { type: Date, default: Date.now },
});

export default mongoose.model('Rating', ratingSchema);
