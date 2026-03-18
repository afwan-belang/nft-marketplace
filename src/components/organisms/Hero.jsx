import React from 'react';
import Button from '../atoms/Button';
import StatItem from '../molecules/StatItem';
import AvatarGroup from '../molecules/AvatarGroup';
import HeroCard from '../molecules/HeroCard';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-[90vh]">
      
      {/* Efek Latar Belakang Lingkungan (Ambient Light) */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* Bagian Kiri: Teks & Aksi */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10 gap-6 lg:gap-8">
        
        <h1 className="text-4xl md:text-6xl lg:text-[4rem] font-bold text-white leading-[1.1] font-display">
          Discover, Collect <br className="hidden md:block" />
          and Sell <span className="text-gradient">Dope</span> <br className="hidden md:block" />
          Art and NFTs
        </h1>
        
        <p className="text-gray-400 max-w-md text-sm md:text-base leading-relaxed">
          The world's largest digital marketplace for crypto collections and non-fungible tokens (NFTs).
        </p>
        
        {/* Buttons */}
        <div className="flex items-center gap-4 mt-2">
          <Button variant="primary" className="px-8 py-3">Browse</Button>
          <Button variant="outline" className="px-8 py-3">Create</Button>
        </div>

        {/* Stats Group & Avatars */}
        <div className="flex flex-col sm:flex-row items-center lg:items-start gap-8 mt-6 lg:mt-8">
          <div className="flex items-center gap-6 md:gap-10 border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0 sm:pr-8">
            <StatItem value="27K +" label="Art works" />
            <StatItem value="20K +" label="Auctions" />
            <StatItem value="7K +" label="Artists" />
          </div>
          <AvatarGroup />
        </div>
      </div>

      {/* Bagian Kanan: Featured Card */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end z-10 mt-10 lg:mt-0">
        <HeroCard />
      </div>

    </section>
  );
};

export default Hero;