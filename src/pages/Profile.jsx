import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Settings, Grid, Activity, Brush, Share2, CheckCircle2, Wallet } from 'lucide-react';
import NFTCard from '../components/molecules/NFTCard';
import useUserStore from '../store/useUserStore';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('collected');
  const [copied, setCopied] = useState(false);

  const { balance, collectedNFTs, activities } = useUserStore();

  const walletAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
  const shortWallet = `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-20 relative z-10 min-h-screen">

      {/* HERO BANNER */}
      <div className="w-full h-48 md:h-72 relative">
        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" alt="Profile Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative -mt-16 md:-mt-24">

        {/* ========================================================
            USER INFO SECTION (PIXEL-PERFECT DESKTOP OPTIMIZATION)
            ======================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">

          {/* Bagian Kiri: Avatar & Info */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8 text-center md:text-left">

            {/* Avatar (Lebih menonjol ke atas banner) */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-[6px] border-dark-bg overflow-hidden bg-dark-bg relative shrink-0 shadow-2xl z-10">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="User Avatar" className="w-full h-full object-cover" />
            </div>

            {/* Blok Teks (Dibuat pb-2 agar sejajar rata bawah dengan Avatar) */}
            <div className="pb-2">
              <h1 className="text-3xl md:text-4xl font-black font-display text-white mb-4 leading-none tracking-wide">Alex Anderson</h1>

              {/* Flex Container Kapsul: Menggunakan tinggi tetap (h-11) untuk semua elemen */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">

                {/* KAPSUL 1: WALLET */}
                <div className="h-11 inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 rounded-xl transition-colors shadow-sm group">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                  <span className="text-sm text-gray-300 font-mono tracking-wider leading-none pt-0.5">{shortWallet}</span>
                  <button onClick={handleCopy} className="text-gray-500 group-hover:text-white transition-colors flex items-center" title="Copy Address">
                    {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                  </button>
                </div>

                {/* KAPSUL 2: BALANCE (Dengan Vertical Divider) */}
                <div className="h-11 inline-flex items-center gap-3 bg-primary/10 border border-primary/30 px-4 rounded-xl shadow-[0_0_15px_rgba(138,43,226,0.15)] backdrop-blur-sm">
                  <Wallet size={16} className="text-primary" />
                  <span className="text-sm text-primary/80 font-medium leading-none pt-0.5">Balance</span>
                  {/* Pemisah Vertikal */}
                  <div className="w-px h-5 bg-primary/30"></div>
                  <span className="text-sm text-white font-bold leading-none pt-0.5">{balance.toFixed(3)} ETH</span>
                </div>

              </div>
            </div>
          </div>

          {/* Bagian Kanan: Action Buttons (Tinggi dikunci di h-11 agar sejajar sempurna dengan kapsul kiri) */}
          <div className="flex justify-center md:justify-end gap-3 pb-2 w-full md:w-auto">
            <button className="w-11 h-11 rounded-xl glass-panel flex justify-center items-center text-gray-400 hover:text-white transition-colors border border-white/10 shadow-lg hover:bg-white/10 hover:border-white/20">
              <Share2 size={18} />
            </button>
            <button className="w-11 h-11 rounded-xl glass-panel flex justify-center items-center text-gray-400 hover:text-white transition-colors border border-white/10 shadow-lg hover:bg-white/10 hover:border-white/20">
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* ========================================================
            TABS NAVIGATION (Sisanya tetap sama)
            ======================================================== */}
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

        {/* TAB CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>

            {activeTab === 'collected' && (
              collectedNFTs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
                  {collectedNFTs.map(nft => (
                    <div key={nft.id} className="h-full flex justify-center w-full transform-gpu">
                      <NFTCard title={nft.title} author={nft.author} initialPrice={nft.price} likes={nft.likes} image={nft.image} accentColor={nft.accentColor} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-500 mb-4 border border-white/10">
                    <Grid size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No items collected</h3>
                  <p className="text-gray-500 text-sm max-w-sm">Explore the marketplace and buy your first NFT to display it here!</p>
                </div>
              )
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
              activities.length > 0 ? (
                <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:flex">
                    <div className="w-1/3">Item</div>
                    <div className="w-1/6 text-right">Price</div>
                    <div className="w-1/6 text-center">From</div>
                    <div className="w-1/6 text-center">To</div>
                    <div className="w-1/6 text-right">Time</div>
                  </div>
                  {activities.map(act => (
                    <div key={act.id} className="p-4 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/5 transition-colors gap-4 md:gap-0">
                      <div className="w-full md:w-1/3 flex items-center gap-3">
                        <img src={act.nftImage} alt="item" className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <div className="text-xs text-green-400 font-bold mb-0.5">{act.type}</div>
                          <div className="text-sm text-white font-medium">{act.nftTitle}</div>
                        </div>
                      </div>
                      <div className="w-full md:w-1/6 flex justify-between md:block md:text-right">
                        <span className="md:hidden text-xs text-gray-500">Price</span>
                        <span className="text-sm font-bold text-white">{act.price} ETH</span>
                      </div>
                      <div className="w-full md:w-1/6 flex justify-between md:block md:text-center">
                        <span className="md:hidden text-xs text-gray-500">From</span>
                        <span className="text-sm text-primary hover:underline cursor-pointer">{act.from}</span>
                      </div>
                      <div className="w-full md:w-1/6 flex justify-between md:block md:text-center">
                        <span className="md:hidden text-xs text-gray-500">To</span>
                        <span className="text-sm text-gray-300">{act.to}</span>
                      </div>
                      <div className="w-full md:w-1/6 flex justify-between md:block md:text-right">
                        <span className="md:hidden text-xs text-gray-500">Time</span>
                        <span className="text-sm text-gray-500">{act.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-gray-500 mb-4 border border-white/10">
                    <Activity size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No activity yet</h3>
                  <p className="text-gray-500 text-sm max-w-sm">Buy an NFT to see your transaction history here.</p>
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Profile;