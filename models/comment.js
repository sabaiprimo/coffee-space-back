import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  recipeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  context: String,
  commentDate: { type: Date, default: Date.now },
});

export default mongoose.model('Comment', commentSchema);
