import React from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator = ({ targetId }) => {
  const handleScroll = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 90;
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
      // PERUBAHAN: bottom-12 untuk mobile (agar tidak tertimpa safe-area OS), bottom-8 untuk desktop
      className="absolute bottom-12 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-80 md:opacity-70 hover:opacity-100 transition-opacity duration-300 z-20 group"
    >
      <span className="text-[10px] md:text-sm text-gray-400 font-medium tracking-wide group-hover:text-white transition-colors text-center whitespace-nowrap">
        Scroll untuk info lainnya
      </span>
      
      <div className="w-5 h-9 md:w-6 md:h-10 border-2 border-white/30 rounded-full flex justify-center p-1 group-hover:border-primary transition-colors">
        <div className="w-1 h-1.5 md:h-2 bg-primary rounded-full animate-bounce mt-0.5 md:mt-1"></div>
      </div>
      
      <ChevronDown size={18} className="text-white/50 animate-bounce -mt-1 group-hover:text-primary transition-colors md:w-5 md:h-5" />
    </div>
  );
};

export default ScrollIndicator;