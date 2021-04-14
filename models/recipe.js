import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const Schema = mongoose.Schema;
const saltRound = 12;

const recipeSchema = new Schema({
  title: String,
  description: String,
  preparationTime: String,
  totalTime: String,
  serving: Number,
  roastLevel: String,
  level: String,
  ingredient: String,
  equipment: String,
  directions: [
    {
      step: { type: Number },
      content: { type: String },
    },
  ],
});

export default mongoose.model('Recipe', recipeSchema);
