import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
const saltRound = 12;

const recipeSchema = new Schema({
  title: String,
  description: String,
  preparationTime: Number,
  totalTime: Number,
  serving: Number,
  roastLevel: String,
  level: String,
  ingredients: [String],
  equipments: [String],
  directions: [
    {
      step: { type: Number },
      content: { type: String },
    },
  ],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  images: [
    {
      src: String,
      srcSet: String,
    },
  ],
  issueDate: { type: Date, default: Date.now },
});

export default mongoose.model('Recipe', recipeSchema);
