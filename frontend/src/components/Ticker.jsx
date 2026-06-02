import React from 'react';

const Ticker = ({ news }) => {
  // सिर्फ ब्रेकिंग न्यूज़ को फिल्टर करना
  const breakingNews = news ? news.filter(item => item.isBreaking) : [];

  return (
    <div className="bg-black text-white flex items-center h-10 overflow-hidden text-sm font-bold border-b border-red-600">
      <div className="bg-red-600 text-white px-4 py-2 h-full flex items-center z-10 uppercase tracking-wider animate-pulse">
        BREAKING
      </div>
      <div className="whitespace-nowrap flex items-center h-full w-full">
        <marquee behavior="scroll" direction="left" scrollamount="6" className="w-full">
          {breakingNews.length > 0 ? (
            breakingNews.map((item, idx) => (
              <span key={idx} className="mx-10 inline-flex items-center text-red-400">
                🔥 {item.title}
              </span>
            ))
          ) : (
            <span className="mx-10 text-gray-300">Speed News 24: देश और दुनिया की हर बड़ी खबर सबसे पहले...</span>
          )}
        </marquee>
      </div>
    </div>
  );
};

export default Ticker;