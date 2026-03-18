import React from 'react';
import Button from '../atoms/Button';

const HeroCard = () => {
  return (
    <div className="relative group w-full max-w-[360px] mx-auto lg:mx-0">
      {/* Background Glow (Aura di belakang kartu) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur-xl opacity-40 group-hover:opacity-60 transition duration-500"></div>
      
      {/* Card Container */}
      <div className="glass-panel p-4 rounded-[2rem] relative overflow-hidden flex flex-col transition-all duration-300">
        
        {/* Image Container dengan efek zoom saat hover */}
        <div className="relative w-full h-[380px] rounded-2xl overflow-hidden">
          {/* Menggunakan gambar abstract 3D dari Unsplash sebagai placeholder */}
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" 
            alt="Featured 3D NFT Art" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Floating Info Box di atas gambar */}
        <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex justify-between items-center shadow-lg">
          <div className="flex flex-col">
            <span className="text-xs text-gray-300">Current Bid</span>
            <span className="text-white font-bold font-display text-lg">15.0 ETH</span>
          </div>
          <Button variant="primary" className="px-4 py-1.5 text-xs">
            Place Bid
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;