import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  subtitle: String,
  headline: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //Add user later
  cover: {
    src: String,
  },
  images: [{ src: String, textNumber: Number }],
  content: [
    {
      textNumber: Number,
      text: Sring,
    },
  ],
  issueDate: Date,
});

export default mongoose.model('Article', articleSchema);
