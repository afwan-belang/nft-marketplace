import React from 'react';
import { motion } from 'framer-motion';
import NFTCard from '../molecules/NFTCard';

const PopularSection = () => {
  const popularNFTs = [
    { 
      id: 1, 
      title: "Neon Deity", 
      author: "alexand", 
      initialPrice: 2.450, 
      likes: "12k", 
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop", 
      accentColor: "#a855f7" 
    },
    { 
      id: 2, 
      title: "Digital Genesis", 
      author: "mary_jane", 
      initialPrice: 1.820, 
      likes: "8.5k", 
      image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=600&auto=format&fit=crop", 
      accentColor: "#3b82f6" 
    },
    { 
      id: 3, 
      title: "Crystal Mind", 
      author: "zenith", 
      initialPrice: 3.200, 
      likes: "15k", 
      image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop", 
      accentColor: "#ec4899" 
    },
    { 
      id: 4, 
      title: "Ether Soul", 
      author: "kripto_kid", 
      initialPrice: 0.950, 
      likes: "4.2k", 
      image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=600&auto=format&fit=crop", 
      accentColor: "#10b981" 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
            Popular this week
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="flex overflow-x-auto no-scrollbar gap-6 snap-x pb-8 pt-4 items-stretch md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 transform-gpu"
        >
          {popularNFTs.map((nft) => (
            <motion.div 
              key={nft.id} 
              variants={itemVariants} 
              // PERBAIKAN MOBILE: justify-center w-full md:w-auto agar terpusat
              className="snap-center h-auto flex justify-center w-full md:w-auto" 
              style={{ willChange: "transform, opacity" }}
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
        </motion.div>

      </div>
    </section>
  );
};

export default PopularSection;