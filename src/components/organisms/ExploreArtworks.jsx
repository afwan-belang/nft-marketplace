import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Filter } from 'lucide-react';
import NFTCard from '../molecules/NFTCard';

const fetchExploreNFTs = async () => {
  await new Promise(resolve => setTimeout(resolve, 800)); 
  
  return [
    { id: 101, title: "Neon Deity", author: "alexand", initialPrice: 2.45, likes: "12k", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop", category: "art", accentColor: "#a855f7" },
    { id: 102, title: "Pepe Cyberpunk", author: "meme_lord", initialPrice: 0.85, likes: "45k", image: "https://images.unsplash.com/photo-1575365717666-1a84be3fd104?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3liZXJwdW5rfGVufDB8fDB8fHww", category: "meme", accentColor: "#10b981" },
    { id: 103, title: "Excalibur X", author: "gamer_x", initialPrice: 1.20, likes: "8.1k", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop", category: "gaming", accentColor: "#ef4444" },
    { id: 104, title: "Astro Ape", author: "moon_walker", initialPrice: 3.50, likes: "22k", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop", category: "art", accentColor: "#ec4899" },
    { id: 105, title: "Doge Father", author: "crypto_king", initialPrice: 4.20, likes: "99k", image: "https://images.unsplash.com/photo-1660063235722-8703b63f5516?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", category: "meme", accentColor: "#f59e0b" },
    { id: 106, title: "Pixel Racer", author: "retro_dev", initialPrice: 0.45, likes: "2.3k", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop", category: "gaming", accentColor: "#3b82f6" },
    { id: 107, title: "Void Walker", author: "zenith", initialPrice: 1.80, likes: "14k", image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=600&auto=format&fit=crop", category: "art", accentColor: "#8b5cf6" },
    { id: 108, title: "ETH to Moon", author: "vitalik_fan", initialPrice: 0.10, likes: "5k", image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop", category: "meme", accentColor: "#6366f1" },
  ];
};

const ExploreArtworks = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = ['all', 'art', 'gaming', 'meme'];

  const { data: nfts, isLoading } = useQuery({
    queryKey: ['exploreNFTs'],
    queryFn: fetchExploreNFTs
  });

  const filteredNFTs = nfts?.filter(nft => 
    activeFilter === 'all' ? true : nft.category === activeFilter
  ) || [];

  return (
    <section className="py-16 relative z-10" id="explore">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-2">
              Explore Collections
            </h2>
            <p className="text-gray-400 text-sm">Discover top trending NFTs in various categories.</p>
          </div>

          <div className="flex items-center overflow-x-auto no-scrollbar gap-3 pb-2 md:pb-0">
            <div className="flex items-center gap-2 mr-2 text-gray-400 shrink-0">
              <Filter size={18} />
            </div>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 capitalize border shrink-0 ${
                  activeFilter === filter 
                  ? 'bg-primary text-white border-primary shadow-[0_0_15px_rgba(138,43,226,0.4)]' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="w-full flex justify-center items-center py-20 min-h-[400px]">
            <div className="w-12 h-12 border-4 border-white/10 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch"
          >
            <AnimatePresence mode='popLayout'>
              {filteredNFTs.map(nft => (
                <motion.div
                  key={nft.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  // PERBAIKAN MOBILE: justify-center w-full agar grid item terpusat
                  className="h-full flex justify-center w-full transform-gpu"
                >
                  <NFTCard 
                    title={nft.title}
                    author={nft.author}
                    initialPrice={nft.initialPrice}
                    likes={nft.likes}
                    image={nft.image}
                    accentColor={nft.accentColor}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default ExploreArtworks;