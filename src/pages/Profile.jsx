import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Settings, Grid, Activity, Brush, Share2, CheckCircle2 } from 'lucide-react';
import NFTCard from '../components/molecules/NFTCard';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('collected');
  const [copied, setCopied] = useState(false);

  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
  const shortWallet = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mock Data untuk NFT yang dimiliki user
  const collectedNFTs = [
    { id: 1, title: "Neon Deity", author: "mary_jane", initialPrice: 2.45, likes: "12k", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=600&auto=format&fit=crop", accentColor: "#a855f7" },
    { id: 2, title: "Void Walker", author: "zenith", initialPrice: 1.80, likes: "14k", image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?q=80&w=600&auto=format&fit=crop", accentColor: "#8b5cf6" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="pb-20 relative z-10 min-h-screen"
    >
      {/* 1. HERO BANNER */}
      <div className="w-full h-48 md:h-72 relative">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
          alt="Profile Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative -mt-16 md:-mt-24">
        {/* 2. USER INFO SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 text-center md:text-left">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-dark-bg overflow-hidden bg-dark-bg relative shrink-0">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="User Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="pb-2">
              <h1 className="text-3xl md:text-4xl font-black font-display text-white mb-2">Alex Anderson</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                <span className="text-gray-400 font-medium bg-white/5 px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  {shortWallet}
                  <button onClick={handleCopy} className="ml-1 text-gray-500 hover:text-white transition-colors">
                    {copied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </span>
                <span className="text-gray-400 text-xs mt-1 md:mt-0">Joined March 2026</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 pb-2">
            <button className="w-10 h-10 rounded-full glass-panel flex justify-center items-center text-gray-400 hover:text-white transition-colors border border-white/10">
              <Share2 size={18} />
            </button>
            <button className="w-10 h-10 rounded-full glass-panel flex justify-center items-center text-gray-400 hover:text-white transition-colors border border-white/10">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* 3. TABS NAVIGATION */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-white/10 mb-8">
          <button onClick={() => setActiveTab('collected')} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'collected' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
            <Grid size={18} /> Collected <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs">{collectedNFTs.length}</span>
            {activeTab === 'collected' && <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
          <button onClick={() => setActiveTab('created')} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'created' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
            <Brush size={18} /> Created
            {activeTab === 'created' && <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
          <button onClick={() => setActiveTab('activity')} className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'activity' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
            <Activity size={18} /> Activity
            {activeTab === 'activity' && <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </button>
        </div>

        {/* 4. TAB CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
          >
            {activeTab === 'collected' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                {collectedNFTs.map(nft => (
                  <div key={nft.id} className="h-full flex justify-center w-full transform-gpu">
                    <NFTCard {...nft} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'created' && (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-500 mb-4 border border-white/10">
                  <Brush size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No items created yet</h3>
                <p className="text-gray-500 text-sm max-w-sm">You haven't minted or created any NFTs. Once you do, they will appear here.</p>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:flex">
                  <div className="w-1/3">Item</div>
                  <div className="w-1/6 text-right">Price</div>
                  <div className="w-1/6 text-center">From</div>
                  <div className="w-1/6 text-center">To</div>
                  <div className="w-1/6 text-right">Time</div>
                </div>
                {/* Mock Activity Item */}
                <div className="p-4 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/5 transition-colors gap-4 md:gap-0">
                  <div className="w-full md:w-1/3 flex items-center gap-3">
                    <img src={collectedNFTs[0].image} alt="item" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="text-xs text-green-400 font-bold mb-0.5">Sale</div>
                      <div className="text-sm text-white font-medium">{collectedNFTs[0].title}</div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/6 flex justify-between md:block md:text-right">
                    <span className="md:hidden text-xs text-gray-500">Price</span>
                    <span className="text-sm font-bold text-white">2.45 ETH</span>
                  </div>
                  <div className="w-full md:w-1/6 flex justify-between md:block md:text-center">
                    <span className="md:hidden text-xs text-gray-500">From</span>
                    <span className="text-sm text-primary hover:underline cursor-pointer">mary_jane</span>
                  </div>
                  <div className="w-full md:w-1/6 flex justify-between md:block md:text-center">
                    <span className="md:hidden text-xs text-gray-500">To</span>
                    <span className="text-sm text-gray-300">Alex (You)</span>
                  </div>
                  <div className="w-full md:w-1/6 flex justify-between md:block md:text-right">
                    <span className="md:hidden text-xs text-gray-500">Time</span>
                    <span className="text-sm text-gray-500">2 mins ago</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Profile;