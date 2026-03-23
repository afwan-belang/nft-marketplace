import React from 'react';
import { motion } from 'framer-motion'; // 1. Import framer-motion
import NFTCard from '../molecules/NFTCard';

const PopularSection = () => {
  const popularNFTs = [
    { id: 1, title: "Neon Deity", author: "alexand", price: "2.4 ETH", likes: "12k", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop", accentColor: "#a855f7" },
    { id: 2, title: "Digital Genesis", author: "mary_jane", price: "1.8 ETH", likes: "8.5k", image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=600&auto=format&fit=crop", accentColor: "#3b82f6" },
    { id: 3, title: "Crystal Mind", author: "zenith", price: "3.2 ETH", likes: "15k", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop", accentColor: "#ec4899" },
    { id: 4, title: "Ether Soul", author: "kripto_kid", price: "0.9 ETH", likes: "4.2k", image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=600&auto=format&fit=crop", accentColor: "#10b981" }
  ];

  // 2. Definisi Animasi Container (Induk)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 } // Jeda 0.15 detik antar kartu
    }
  };

  // 3. Definisi Animasi Item (Anak)
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 12 } }
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

        {/* 4. Implementasi motion.div pada Container */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex overflow-x-auto no-scrollbar gap-6 snap-x pb-8 pt-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6"
        >
          {popularNFTs.map((nft) => (
            // 5. Implementasi motion.div pada setiap Item
            <motion.div key={nft.id} variants={itemVariants} className="snap-center">
              <NFTCard 
                title={nft.title}
                author={nft.author}
                price={nft.price}
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