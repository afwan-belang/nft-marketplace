import React from 'react';
import { Heart } from 'lucide-react';

const NFTCard = ({ image, title, author, price, likes, accentColor }) => {
  return (
    <div className="relative group min-w-[260px] md:min-w-[280px] w-full max-w-[300px] snap-center cursor-pointer">
      
      {/* Dynamic Glow Background */}
      <div 
        className="absolute -inset-0.5 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition duration-500 z-0"
        style={{ backgroundColor: accentColor }}
      ></div>

      {/* Main Card Content */}
      <div className="glass-panel p-3 rounded-3xl relative z-10 flex flex-col h-full bg-dark-bg/40 hover:bg-white/5 transition duration-300">
        
        {/* Image Container */}
        <div className="w-full h-64 rounded-2xl overflow-hidden relative">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Card Info */}
        <div className="p-3 flex flex-col gap-3 mt-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-bold font-display text-lg group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-xs text-gray-400 mt-1">@ {author}</p>
            </div>
            
            {/* Price Badge */}
            <div className="bg-white/10 rounded-lg px-2 py-1 text-center border border-white/5">
              <span className="text-xs text-gray-400 block">Current</span>
              <span className="text-sm text-white font-bold">{price}</span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-white/10 my-1"></div>

          {/* Bottom Action (Likes) */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-secondary font-medium px-2 py-1 bg-secondary/10 rounded-md">
              Place a bid
            </span>
            <div className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors">
              <Heart size={16} />
              <span className="text-xs">{likes}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NFTCard;