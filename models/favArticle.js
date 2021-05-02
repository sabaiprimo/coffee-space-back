import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const favArticleSchema = new Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  favDate: { type: Date, default: Date.now },
  isFav: { type: Boolean, default: true },
});

export default mongoose.model('FavArticle', favArticleSchema);
