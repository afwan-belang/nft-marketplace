import React from 'react';
import { Heart } from 'lucide-react';

const NFTCard = ({ image, title, author, price, likes, accentColor }) => {
  return (
    // 1. Tambahkan h-full pada wapper terluar
    <div className="relative group min-w-[260px] md:min-w-[280px] w-full max-w-[300px] snap-center cursor-pointer h-full">
      
      <div 
        className="absolute -inset-0.5 rounded-3xl blur-xl opacity-20 group-hover:opacity-50 transition duration-500 z-0"
        style={{ backgroundColor: accentColor }}
      ></div>

      {/* 2. Pastikan card utama memiliki h-full */}
      <div className="glass-panel p-3 rounded-3xl relative z-10 flex flex-col h-full bg-dark-bg/40 hover:bg-white/5 transition duration-300">
        
        {/* 3. Tambahkan shrink-0 agar gambar tidak gepeng */}
        <div className="w-full h-56 md:h-64 rounded-2xl overflow-hidden relative shrink-0">
          <img 
            src={image} 
            alt={title} 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* 4. Tambahkan flex-1 dan justify-between agar konten merata ke bawah */}
        <div className="p-3 flex flex-col gap-3 mt-2 flex-1 justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-bold font-display text-lg group-hover:text-primary transition-colors leading-tight">{title}</h3>
              <p className="text-xs text-gray-400 mt-1">@ {author}</p>
            </div>
            
            <div className="bg-white/10 rounded-lg px-2 py-1 text-center border border-white/5 shrink-0 ml-2">
              <span className="text-xs text-gray-400 block">Current</span>
              <span className="text-sm text-white font-bold">{price}</span>
            </div>
          </div>

          {/* Wrapper untuk elemen terbawah agar selalu menempel di bawah */}
          <div>
            <div className="w-full h-[1px] bg-white/10 my-2"></div>
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
    </div>
  );
};

export default NFTCard;