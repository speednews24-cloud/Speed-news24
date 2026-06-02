import React from 'react';

const NewsCard = ({ article }) => {
  if (!article) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow flex flex-col h-full border border-gray-100 dark:border-gray-700">
      {/* Khabar ki Photo */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={article.urlToImage || 'https://via.placeholder.com/800x450.png?text=Speed+News+24'} 
          alt={article.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
          {article.category}
        </span>
      </div>

      {/* Khabar ka Title aur AI Summary */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-md leading-snug line-clamp-2 mb-2 hover:text-red-600 cursor-pointer dark:text-white">
          {article.title}
        </h3>
        
        {/* Agar AI Summary mojud hai toh dikhein */}
        {article.aiSummary && (
          <div className="bg-red-50 dark:bg-slate-700 text-[11px] text-slate-600 dark:text-gray-300 p-2 rounded border-l-2 border-red-600 mb-3 italic">
            {article.aiSummary}
          </div>
        )}
        
        {/* Source aur Date */}
        <div className="mt-auto flex justify-between items-center text-[11px] text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
          <span className="font-semibold text-red-600 dark:text-red-400">{article.source || 'Speed News 24'}</span>
          <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString('hi-IN') : 'Aaj'}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;