import mongoose from 'mongoose';

const posts = mongoose.Schema({
  slug: { type: String },
  title: { type: String },
  _title: { type: String },
  description: { type: String },
  content: { type: String },
  date: { type: Date },
  deletionDate: { type: Date },
});

export default mongoose.model('posts', posts);
