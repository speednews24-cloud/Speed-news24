import News from '../models/News.js';

export const getNews = async (req, res) => {
  try {
    const allNews = await News.find({}).sort({ createdAt: -1 });
    res.status(200).json(allNews);
  } catch (error) { res.status(500).json({ error: error.message }); }
};

export const createNews = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const newNews = await News.create({ title, description, category });
    res.status(201).json(newNews);
  } catch (error) { res.status(500).json({ error: error.message }); }
};
