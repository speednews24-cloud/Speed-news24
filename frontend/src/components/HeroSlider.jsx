import React from 'react';

const HeroSlider = ({ news }) => {
  const mainNews = news && news[0];
  const sideNews = news ? news.slice(1, 3) : [];

  if (!mainNews) return <div className="h-60 bg-gray-200 dark:bg-slate-700 animate-pulse rounded-lg my-6"></div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-6">
      {/* मुख्य बड़ी खबर */}
      <div className="lg:col-span-2 relative group overflow-hidden rounded-lg shadow-lg h-[350px] md:h-[450px]">
        <img 
          src={mainNews.urlToImage} 
          alt={mainNews.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
          <span className="bg-red-600 text-xs uppercase font-bold px-2 py-1 rounded w-max mb-2">
            {mainNews.category}
          </span>
          <h1 className="text-xl md:text-3xl font-extrabold leading-tight hover:text-red-400 cursor-pointer">
            {mainNews.title}
          </h1>
        </div>
      </div>

      {/* साइड की दो अन्य खबरें */}
      <div className="flex flex-col gap-4 h-[350px] md:h-[450px]">
        {sideNews.map((item, idx) => (
          <div key={idx} className="relative flex-1 group overflow-hidden rounded-lg shadow-md min-h-[160px]">
            <img 
              src={item.urlToImage} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-4 text-white">
              <h2 className="text-sm font-bold leading-snug line-clamp-2 hover:text-red-400 cursor-pointer">
                {item.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;