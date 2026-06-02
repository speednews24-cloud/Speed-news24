const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const newsRoutes = require('./routes/newsRoutes');

// .env load karne ke liye
require('dotenv').config();

// 1. App create karo
const app = express();

// 2. Middle-wares use karo
app.use(cors());
app.use(express.json());

// 3. Supabase Database Connection
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // SSL certificate error ko khatam karne ke liye
  }
});

pool.connect()
  .then(() => console.log('✅ Connected to Supabase (PostgreSQL)'))
  .catch((err) => console.log('❌ DB Error:', err));

// Database instance ko routes mein use karne ke liye set kiya
app.set('db', pool);


// ================= 🤖 GEMINI AUTOMATION START =================

// Gemini API se auto-news mangne ka function
async function generateNewsWithGemini() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("Gemini API Key missing in .env file");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `Mujhe India ki 3 sabse nayi aur badi Breaking News (Cricket, Tech ya Trends) Hindi me do. 
    Response strictly ek raw JSON array hona chahiye bina kisi markdown (no \`\`\`json blocks). 
    Format is tarah hona chahiye:
    [
      {"title": "Headline 1", "description": "Puri khabar 1"},
      {"title": "Headline 2", "description": "Puri khabar 2"}
    ]`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    const data = await response.json();
    let rawText = data.candidates[0].content.parts[0].text.trim();
    
    // Markdown clean karne ke liye safety layer
    rawText = rawText.replace(/```json|```/g, "").trim();
    return JSON.parse(rawText);
}

// External Cron Job se hit hone wala auto-fetch route
app.post('/api/cron/fetch-auto-news', async (req, res) => {
    try {
        console.log("🔄 Gemini Auto-Fetch Started...");
        const automatedNewsList = await generateNewsWithGemini();

        for (let news of automatedNewsList) {
            // Aapke pool connection ke throw Supabase Database me save karne ki query
            // (Agar aapki table ka naam 'news' nahi kuch aur hai, toh bas yahan badal lena)
            await pool.query(
                'INSERT INTO news (title, description) VALUES ($1, $2)', 
                [news.title, news.description]
            );
            console.log(`🚀 Auto-Saved to Supabase: ${news.title}`);
        }

        res.status(200).json({ 
            success: true, 
            message: "Gemini ne news database me auto-save kar di!", 
            data: automatedNewsList 
        });

    } catch (error) {
        console.error("❌ Auto-fetch failed:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ================= 🤖 GEMINI AUTOMATION END =================


// 4. Routes aur Server Start
app.use('/api/news', newsRoutes);

// Render ke liye Port dynamic kiya taaki deploy fail na ho
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
