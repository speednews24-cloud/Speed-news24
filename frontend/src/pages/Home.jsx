import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Ticker from '../components/Ticker';
import HeroSlider from '../components/HeroSlider';
import NewsCard from '../components/NewsCard';

const Home = () => {
  const [news, setNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Database/API se news fetch karne ka system
  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      try {
        // Backend ka url (Local testing ke liye)
        let url = 'https://speed-news24.onrender.com/api/news';
        if (activeCategory) url += `?category=${activeCategory}`;
        
        const res = await fetch(url);
        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("News load karne me dikkat aayi:", err);
        // Agar backend chalu nahi hai toh dummy data dikhane ke liye safe check
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      {/* Navigation aur Live Ticker */}
      <Navbar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <Ticker news={news} />
      
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {loading ? (
          <div className="text-center py-20 font-bold text-xl text-red-600 animate-pulse">
            Speed News 24 लोड हो रहा है...
          </div>
        ) : (
          <>
            {/* Badi khabar ka slider sirf main home page par dikhega */}
            {!activeCategory && news.length > 0 && <HeroSlider news={news} />}
            
            {/* Category ki Heading */}
            <div className="flex items-center space-x-2 my-6 border-b-2 border-black dark:border-white pb-1">
              <h2 className="text-sm md:text-lg font-black bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-t uppercase tracking-wider">
                {activeCategory || 'MUKHYA KHABREIN (LATEST)'}
              </h2>
            </div>

            {/* Choti khabron ka Grid Layout */}
            {news.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {news.map((item, idx) => (
                  <NewsCard key={item._id || idx} article={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                Filhal is category me koi khabar nahi mili. Backend connect karke cron run karein.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
