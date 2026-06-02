import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ onPostSuccess }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://speed-news24.onrender.com/api/news', { title, description });
      // Nayi news list mein add karne ke liye parent ko batana
      onPostSuccess(res.data);
      setTitle('');
      setDesc('');
      alert('News Published!');
    } catch (err) {
      alert('Error posting news');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px', padding: '15px', background: '#1a1a1a', borderRadius: '8px' }}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '90%', padding: '10px', marginBottom: '10px' }} />
      <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required style={{ width: '90%', padding: '10px', marginBottom: '10px' }} />
      <button type="submit" style={{ backgroundColor: '#ff0000', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Publish</button>
    </form>
  );
}
export default CreatePost;
