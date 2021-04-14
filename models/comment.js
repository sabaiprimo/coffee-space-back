import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  recipeID: String,
  userId: String,
  context: String,
  commentDate: Date,
});

export default mongoose.model('Comment', commentSchema);
