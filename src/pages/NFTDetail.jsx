import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, Eye, Clock, Tag, AlignLeft, List } from 'lucide-react';
import Button from '../components/atoms/Button';
import LiveChart from '../components/molecules/LiveChart';

const NFTDetail = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [activeTab, setActiveTab] = useState('overview');

  // Simulasi data dari API OpenSea berdasarkan ID URL
  const nftData = {
    title: id.replace(/-/g, ' ').toUpperCase(),
    author: "mary_jane",
    owner: "cripton_master",
    price: 2.45,
    usdPrice: "$8,542.10",
    likes: "12.4K",
    views: "45.2K",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    description: "An exclusive digital manifestation of divine neon energy. This 1/1 artwork represents the genesis of the cyberpunk era in the Ethereum blockchain.",
    properties: [
      { type: "Background", value: "Deep Void", rarity: "8%" },
      { type: "Aura", value: "Neon Purple", rarity: "12%" },
      { type: "Entity", value: "Cyber God", rarity: "2%" }
    ]
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10"
    >
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* BAGIAN KIRI: Gambar NFT (OpenSea Style) */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6">
          <div className="glass-panel rounded-3xl p-2 overflow-hidden border border-white/10 relative group">
            <div className="absolute top-4 right-4 z-10 bg-dark-bg/60 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/10">
              <Heart size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
              <span className="text-xs text-white font-medium">{nftData.likes}</span>
            </div>
            <img 
              src={nftData.image} 
              alt={nftData.title} 
              className="w-full h-auto aspect-square object-cover rounded-2xl"
            />
          </div>

          {/* Properties Panel (Sering ada di OpenSea) */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5">
            <h3 className="text-white font-bold font-display flex items-center gap-2 mb-4">
              <List size={18} className="text-primary" /> Properties
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {nftData.properties.map((prop, idx) => (
                <div key={idx} className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center hover:bg-primary/20 transition-colors cursor-pointer">
                  <span className="text-[10px] uppercase text-primary font-bold tracking-wider block">{prop.type}</span>
                  <span className="text-sm text-white font-medium block mt-1">{prop.value}</span>
                  <span className="text-[10px] text-gray-400 block mt-1">{prop.rarity} have this</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BAGIAN KANAN: Detail & Transaksi */}
        <div className="w-full lg:w-3/5 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="text-primary font-medium tracking-wide">
              {nftData.title} Collection
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full glass-panel flex justify-center items-center text-gray-400 hover:text-white transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black font-display text-white mb-6">
            {nftData.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <img src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=50" className="w-8 h-8 rounded-full" alt="Creator" />
              <span className="text-gray-400">Creator <span className="text-white font-bold ml-1">@{nftData.author}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-gray-500" />
              <span className="text-gray-400">{nftData.views} views</span>
            </div>
          </div>

          {/* Harga & Bidding Box */}
          <div className="glass-panel rounded-3xl p-6 border border-white/10 mb-8 bg-dark-bg/40 relative overflow-hidden">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Clock size={16} /> Sale ends in 12 hours
            </div>
            <div className="text-sm text-gray-400 mb-1">Current Price</div>
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-black text-white">{nftData.price} ETH</span>
              <span className="text-lg text-gray-500 mb-1">{nftData.usdPrice}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button variant="primary" className="flex-1 py-4 text-lg">
                <Tag size={18} className="mr-2 inline" /> Buy Now
              </Button>
              <Button variant="glass" className="flex-1 py-4 text-lg border-white/20">
                Make Offer
              </Button>
            </div>

            {/* Inject Grafik Live Price */}
            <div className="mt-4 border-t border-white/10 pt-4">
              <h4 className="text-sm text-gray-400 mb-2">Price History (Live)</h4>
              <LiveChart color="#8A2BE2" />
            </div>
          </div>

          {/* Description */}
          <div className="glass-panel rounded-2xl p-5 border border-white/5">
             <h3 className="text-white font-bold font-display flex items-center gap-2 mb-3">
              <AlignLeft size={18} className="text-primary" /> Description
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              {nftData.description}
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default NFTDetail;