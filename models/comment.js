import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  recipeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  context: String,
  commentDate: Date,
});

export default mongoose.model('Comment', commentSchema);
