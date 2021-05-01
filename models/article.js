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
  content: [
    {
      text: String,
      images: [String],
    },
  ],
  issueDate: Date,
  tags: [String],
  isFeatured: { type: Boolean, default: false },
});

export default mongoose.model('Article', articleSchema);
