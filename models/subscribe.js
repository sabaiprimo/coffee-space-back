import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const subscribeSchema = new Schema({
  email: { type: String, required: true, unique: true },
  isSub: { type: Boolean, default: true },
});

export default mongoose.model('Subscribe', subscribeSchema);
