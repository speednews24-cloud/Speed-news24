import mongoose from 'mongoose';
const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  urlToImage: { type: String, default: 'https://via.placeholder.com/800x450.png?text=Speed+News+24' },
  category: { type: String, required: true },
  aiSummary: { type: String },
  source: { type: String, default: 'Speed News 24' },
  isBreaking: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('News', newsSchema);
