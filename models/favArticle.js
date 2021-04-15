import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const favArticleSchema = new Schema({
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  favDate: Date,
});

export default mongoose.model('FavArticle', favArticleSchema);
