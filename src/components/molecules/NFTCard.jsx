import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import LiveChart from './LiveChart';

const NFTCard = ({ image, title, author, initialPrice, likes, accentColor }) => {
  const [currentPrice, setCurrentPrice] = useState(initialPrice);
  const [priceStatus, setPriceStatus] = useState('neutral');

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const change = (Math.random() - 0.5) * 0.1;
        setCurrentPrice(prev => {
          const newPrice = prev + change;
          setPriceStatus(change > 0 ? 'up' : 'down');
          setTimeout(() => setPriceStatus('neutral'), 1000);
          return Number(Math.max(0.1, newPrice).toFixed(3));
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group min-w-[260px] md:min-w-[280px] w-full max-w-[300px] snap-center cursor-pointer h-full">
      
      {/* PERBAIKAN GLOW EFFECT: 
        - inset-0 (tidak lagi melebar keluar dari card)
        - blur-lg (sebelumnya blur-xl, sekarang pendaran lebih terpusat)
        - opacity-10 group-hover:opacity-25 (sebelumnya sampai 50, sekarang maksimal 25% agar tidak silau)
      */}
      <div 
        className="absolute inset-0 rounded-3xl blur-lg opacity-10 group-hover:opacity-25 transition duration-700 z-0"
        style={{ backgroundColor: accentColor }}
      ></div>

      <div className="glass-panel p-3 rounded-3xl relative z-10 flex flex-col h-full bg-dark-bg/60 hover:bg-dark-bg/80 transition duration-500 border border-white/5 group-hover:border-white/10">
        
        <div className="w-full h-48 md:h-56 rounded-2xl overflow-hidden relative shrink-0">
          <img 
            src={image} 
            alt={title} 
            loading="lazy" 
            decoding="async" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" // Efek zoom gambar juga saya kurangi menjadi 105 agar lebih santai
          />
        </div>

        <div className="p-3 flex flex-col gap-2 mt-2 flex-1 justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white font-bold font-display text-lg group-hover:text-primary transition-colors leading-tight">{title}</h3>
              <p className="text-xs text-gray-400 mt-1">@ {author}</p>
            </div>
            
            <div className={`bg-white/5 rounded-lg px-2 py-1 text-center border transition-all duration-300 ${
              priceStatus === 'up' ? 'border-green-500/30 bg-green-500/10' : 
              priceStatus === 'down' ? 'border-red-500/30 bg-red-500/10' : 
              'border-white/5'
            }`}>
              <span className="text-[10px] text-gray-400 block">Live Bid</span>
              <span className={`text-sm font-bold transition-colors duration-300 ${
                priceStatus === 'up' ? 'text-green-400' : 
                priceStatus === 'down' ? 'text-red-400' : 'text-white'
              }`}>
                {currentPrice} ETH
              </span>
            </div>
          </div>

          <LiveChart color={accentColor} />

          <div>
            <div className="w-full h-[1px] bg-white/5 my-2 transition-colors duration-300 group-hover:bg-white/10"></div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-300 font-medium px-2 py-1 bg-white/5 rounded-md transition-colors duration-300 group-hover:bg-secondary/20 group-hover:text-secondary">
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