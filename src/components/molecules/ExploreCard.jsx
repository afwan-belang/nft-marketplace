import React from 'react';

const ExploreCard = ({ image, title, itemsCount }) => {
  return (
    <div className="relative group overflow-hidden rounded-[2rem] h-48 md:h-56 lg:h-64 cursor-pointer glass-panel border border-white/10">
      {/* Gambar Latar */}
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      {/* Overlay Gradasi & Info */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 via-dark-bg/20 to-transparent flex flex-col justify-end p-5 lg:p-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-between items-end">
          <h3 className="text-white font-bold font-display text-lg lg:text-xl tracking-wide">{title}</h3>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
            <span className="text-xs text-gray-300 font-medium">{itemsCount} Items</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;