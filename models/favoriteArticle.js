import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const favoriteArticleSchema = new Schema({
  articleID: String,
  userId: String,
});

export default mongoose.model('FavoriteArticle', favoriteSchema);
