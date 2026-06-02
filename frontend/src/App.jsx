import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import axios from 'axios';

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios.get('https://speed-news24.onrender.com/api/news')
      .then(res => setNews(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="app-container">
      <Navbar />
      <Ticker news={news} />
      {/* CreatePost और Delete बटन हटा दिए गए हैं */}
      <div className="news-feed">
        <h2 className="title">SPEED NEWS 24 LIVE</h2>
        {news.map((item) => (
          <div key={item._id} className="news-card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
