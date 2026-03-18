import React from 'react';
import Button from '../atoms/Button';

const CTASection = () => {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Banner Container */}
        <div className="relative rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-16 lg:p-20 overflow-hidden group">
          
          {/* Background Gradient & Blur Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-secondary/80 opacity-90 backdrop-blur-xl -z-10"></div>
          
          {/* Efek pattern/noise opsional (menggunakan radial gradient halus) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,transparent_100%)] -z-10 pointer-events-none"></div>

          {/* Content */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-8 z-10 relative">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-tight">
              Join Us to Create Sell and Collect NFTs Digital Art
            </h2>
            
            <Button variant="glass" className="px-8 py-3.5 text-lg font-semibold border-white/40 hover:bg-white/20">
              Join Community
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;