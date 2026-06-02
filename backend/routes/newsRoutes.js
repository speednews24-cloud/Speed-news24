const express = require('express');
const router = express.Router();

// GET Route: डेटाबेस से सारी न्यूज़ निकालने के लिए
router.get('/', async (req, res) => {
    try {
        const db = req.app.get('db'); // server.js से pool instance निकाला
        const result = await db.query('SELECT id AS _id, title, description FROM news ORDER BY id DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('❌ Error fetching news:', err);
        res.status(500).json({ error: 'Database error occurred' });
    }
});

// POST Route: डेटाबेस में नई न्यूज़ डालने के लिए
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    
    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    try {
        const db = req.app.get('db');
        const queryText = 'INSERT INTO news (title, description) VALUES ($1, $2) RETURNING id AS _id, title, description';
        const result = await db.query(queryText, [title, description]);
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('❌ Error inserting news:', err);
        res.status(500).json({ error: 'Database error occurred' });
    }
});

module.exports = router;
