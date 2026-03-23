import React from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator = ({ targetId }) => {
  // Fungsi untuk scroll mulus ke seksi berikutnya saat ikon diklik
  const handleScroll = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 90; // Menyesuaikan dengan tinggi navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      onClick={handleScroll}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-300 z-20 group"
    >
      <span className="text-xs md:text-sm text-gray-400 font-medium tracking-wide group-hover:text-white transition-colors">
        Scroll untuk info lainnya
      </span>
      
      {/* Bentuk Mouse */}
      <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 group-hover:border-primary transition-colors">
        {/* Roda Mouse (Scroll Wheel) yang bergerak */}
        <div className="w-1 h-2 bg-primary rounded-full animate-bounce mt-1"></div>
      </div>
      
      {/* Panah bawah */}
      <ChevronDown size={20} className="text-white/50 animate-bounce -mt-1 group-hover:text-primary transition-colors" />
    </div>
  );
};

export default ScrollIndicator;