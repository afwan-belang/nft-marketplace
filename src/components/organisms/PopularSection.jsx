import React from 'react';
import NFTCard from '../molecules/NFTCard';

const PopularSection = () => {
  // Dummy data menggunakan gambar 3D neon dari Unsplash
  const popularNFTs = [
    {
      id: 1,
      title: "Neon Deity",
      author: "alexand",
      price: "2.4 ETH",
      likes: "12k",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop",
      accentColor: "#a855f7" // Ungu
    },
    {
      id: 2,
      title: "Digital Genesis",
      author: "mary_jane",
      price: "1.8 ETH",
      likes: "8.5k",
      image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=600&auto=format&fit=crop",
      accentColor: "#3b82f6" // Biru
    },
    {
      id: 3,
      title: "Crystal Mind",
      author: "zenith",
      price: "3.2 ETH",
      likes: "15k",
      image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=600&auto=format&fit=crop",
      accentColor: "#ec4899" // Pink
    },
    {
      id: 4,
      title: "Ether Soul",
      author: "kripto_kid",
      price: "0.9 ETH",
      likes: "4.2k",
      image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=600&auto=format&fit=crop",
      accentColor: "#10b981" // Emerald/Hijau
    }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
            Popular this week
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Cards Container (Horizontal scroll di Mobile, Grid/Flex di Desktop) */}
        <div className="flex overflow-x-auto no-scrollbar gap-6 snap-x pb-8 pt-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6">
          {popularNFTs.map((nft) => (
            <NFTCard 
              key={nft.id}
              title={nft.title}
              author={nft.author}
              price={nft.price}
              likes={nft.likes}
              image={nft.image}
              accentColor={nft.accentColor}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularSection;