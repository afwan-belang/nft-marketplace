import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Share2, Eye, Clock, Tag, AlignLeft, List, 
  X, CheckCircle, Wallet, ChevronRight, Loader2, ShieldCheck 
} from 'lucide-react';
import Button from '../components/atoms/Button';
import LiveChart from '../components/molecules/LiveChart';

const NFTDetail = () => {
  const { id } = useParams(); 

  // Mock Data NFT (Sama seperti sebelumnya)
  const nftData = {
    title: id ? id.replace(/-/g, ' ').toUpperCase() : 'UNKNOWN NFT',
    author: "mary_jane",
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

  // State Manajemen Transaksi (Sama seperti sebelumnya)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [txState, setTxState] = useState('idle'); // 'connect', 'review', 'signing', 'processing', 'success'

  const handleInitiateBuy = () => {
    setIsModalOpen(true);
    setTxState(isWalletConnected ? 'review' : 'connect');
  };

  const handleConnectWallet = () => {
    setTxState('signing'); 
    setTimeout(() => {
      setIsWalletConnected(true);
      setTxState('review');
    }, 1500);
  };

  const handleConfirmPurchase = () => {
    setTxState('signing'); 
    setTimeout(() => {
      setTxState('processing'); 
      setTimeout(() => {
        setTxState('success'); 
      }, 4000); 
    }, 2000); 
  };

  const closeModal = () => {
    if (txState !== 'signing' && txState !== 'processing') {
      setIsModalOpen(false);
      setTimeout(() => {
        if (txState === 'success') setTxState('review');
      }, 500);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
        className="pt-24 md:pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10"
      >
        {/* DETAIL PAGE CONTENT (Sama seperti sebelumnya, tidak ada perubahan di sini) */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          {/* KIRI: Gambar & Properti */}
          <div className="w-full lg:w-2/5 flex flex-col gap-6">
            <div className="glass-panel rounded-3xl p-2 overflow-hidden border border-white/10 relative group">
              <div className="absolute top-4 right-4 z-10 bg-dark-bg/60 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/10">
                <Heart size={16} className="text-gray-400" />
                <span className="text-xs text-white font-medium">{nftData.likes}</span>
              </div>
              <img src={nftData.image} alt={nftData.title} className="w-full h-auto aspect-square object-cover rounded-2xl" />
            </div>
            <div className="glass-panel rounded-2xl p-4 md:p-5 border border-white/5 hidden md:block">
              <h3 className="text-white font-bold font-display flex items-center gap-2 mb-4">
                <List size={18} className="text-primary" /> Properties
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {nftData.properties.map((prop, idx) => (
                  <div key={idx} className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
                    <span className="text-[10px] uppercase text-primary font-bold tracking-wider block">{prop.type}</span>
                    <span className="text-sm text-white font-medium block mt-1">{prop.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* KANAN: Detail, Harga & Action */}
          <div className="w-full lg:w-3/5 flex flex-col">
            <h1 className="text-3xl md:text-5xl font-black font-display text-white mb-4 mt-2 md:mt-0 leading-tight">
              {nftData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 text-sm">
              <div className="flex items-center gap-2 bg-white/5 pr-4 pl-1 py-1 rounded-full border border-white/10">
                <img src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=50" className="w-6 h-6 rounded-full" alt="Creator" />
                <span className="text-gray-400">Creator <span className="text-white font-bold ml-1">@{nftData.author}</span></span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Eye size={16} /> {nftData.views} views
              </div>
            </div>
            <div className="glass-panel rounded-3xl p-5 md:p-6 border border-white/10 mb-6 bg-dark-bg/40">
              <div className="flex items-center gap-2 text-gray-400 mb-2 text-xs md:text-sm">
                <Clock size={16} /> Sale ends in 12 hours
              </div>
              <div className="text-sm text-gray-400 mb-1">Current Price</div>
              <div className="flex items-end gap-3 mb-6">
                <span className="text-3xl md:text-4xl font-black text-white">{nftData.price} ETH</span>
                <span className="text-base md:text-lg text-gray-500 mb-1">{nftData.usdPrice}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4">
                <Button variant="primary" className="w-full sm:flex-1 py-3 md:py-4 text-base md:text-lg" onClick={handleInitiateBuy}>
                  <Tag size={18} className="mr-2 inline" /> Buy Now
                </Button>
                <Button variant="glass" className="w-full sm:flex-1 py-3 md:py-4 text-base md:text-lg border-white/20">
                  Make Offer
                </Button>
              </div>
              <div className="mt-4 border-t border-white/10 pt-4 hidden md:block">
                <h4 className="text-sm text-gray-400 mb-2">Price History (Live)</h4>
                <LiveChart color="#8A2BE2" />
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-4 md:p-5 border border-white/5">
               <h3 className="text-white font-bold font-display flex items-center gap-2 mb-3">
                <AlignLeft size={18} className="text-primary" /> Description
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                {nftData.description}
              </p>
            </div>
            {/* Properties Mobile */}
            <div className="glass-panel rounded-2xl p-4 border border-white/5 mt-6 md:hidden">
              <h3 className="text-white font-bold font-display flex items-center gap-2 mb-4">
                <List size={18} className="text-primary" /> Properties
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {nftData.properties.map((prop, idx) => (
                  <div key={idx} className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
                    <span className="text-[10px] uppercase text-primary font-bold tracking-wider block">{prop.type}</span>
                    <span className="text-sm text-white font-medium block mt-1">{prop.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* =======================================================
          WEB3 TRANSACTION MODAL (NEW: CENTERED & HIGH BLUR)
          ======================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          // Pembungkus Luar: Sekarang Flex Center untuk Mobile & Desktop
          <div className="fixed inset-0 z-[100] flex justify-center items-center pointer-events-none px-4">
            
            {/* Backdrop Gelap & BURAM TOTAL (backdrop-blur-md) */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              // PERBAIKAN: backdrop-blur-md untuk efek buram latar belakang yang kuat
              className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto transform-gpu"
            />

            {/* Kontainer Modal */}
            <motion.div 
              // Animasi baru: Muncul mengecil (scale) dan memudar (fade), bukan dari bawah
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              // Menggunakan kurva smooth easing kita sebelumnya
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              // PERBAIKAN LAYOUT: 
              // - rounded-3xl (sama di mobile/desktop, tidak lagi bottom-sheet)
              // - max-w-lg (sedikit lebih lebar di desktop)
              // - borderborder-white/10 (border penuh)
              className="w-full max-w-lg bg-dark-bg/90 border border-white/10 rounded-3xl p-6 md:p-8 relative z-10 pointer-events-auto shadow-2xl overflow-hidden transform-gpu"
            >
              {/* Garis penarik mobile DIHAPUS karena bukan bottom sheet lagi */}

              <button 
                onClick={closeModal}
                disabled={txState === 'signing' || txState === 'processing'}
                className="absolute top-4 md:top-5 right-4 md:right-5 text-gray-500 hover:text-white disabled:opacity-0 transition-all p-1.5 bg-white/5 rounded-full z-20"
              >
                <X size={18} />
              </button>

              {/* STATE 1: CONNECT WALLET */}
              {txState === 'connect' && (
                <div className="py-2">
                  <h3 className="text-2xl font-bold font-display text-white mb-2 text-center">Connect Wallet</h3>
                  <p className="text-gray-400 text-sm mb-6 text-center">Choose your preferred wallet to proceed.</p>
                  
                  <div className="flex flex-col gap-3">
                    <button onClick={handleConnectWallet} className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 p-4 md:p-5 rounded-2xl transition-all group w-full text-left">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#F6851B]/20 rounded-full flex justify-center items-center shrink-0">
                          <Wallet className="text-[#F6851B]" size={20} md:size={24} />
                        </div>
                        <span className="text-white font-medium text-lg md:text-xl">MetaMask</span>
                      </div>
                      <ChevronRight className="text-gray-500 group-hover:text-white transition-colors" />
                    </button>
                    <button onClick={handleConnectWallet} className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 p-4 md:p-5 rounded-2xl transition-all group w-full text-left">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/20 rounded-full flex justify-center items-center shrink-0">
                          <ShieldCheck className="text-blue-500" size={20} md:size={24} />
                        </div>
                        <span className="text-white font-medium text-lg md:text-xl">Trust Wallet</span>
                      </div>
                      <ChevronRight className="text-gray-500 group-hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              )}

              {/* STATE 2: REVIEW TRANSAKSI */}
              {txState === 'review' && (
                <div className="py-2">
                  <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-6 text-center">Checkout Review</h3>
                  
                  {/* Item Preview */}
                  <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-3 md:p-4 mb-6 border border-white/10">
                    <img src={nftData.image} alt="NFT" className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="text-[10px] md:text-xs text-primary font-bold mb-1 tracking-wider">PLAY NFT COLLECTION</div>
                      <div className="text-white font-medium leading-tight text-base md:text-lg">{nftData.title}</div>
                      <div className="text-xs text-gray-400 mt-1 md:hidden">by @mary_jane</div>
                    </div>
                  </div>

                  {/* Rincian Harga */}
                  <div className="space-y-4 mb-8 px-1 md:px-2">
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-gray-400">Item Price</span>
                      <span className="text-white font-medium">{nftData.price} ETH</span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-gray-400">Estimated Gas Fee</span>
                      <span className="text-white font-medium">0.015 ETH</span>
                    </div>
                    <div className="w-full h-px bg-white/10 my-2 transform-gpu"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-bold md:text-lg">Total Request</span>
                      <div className="text-right">
                        <div className="text-primary font-bold text-xl md:text-2xl">{(nftData.price + 0.015).toFixed(3)} ETH</div>
                        <div className="text-xs text-gray-500 mt-1 md:text-sm">~ $8,590.20 USD</div>
                      </div>
                    </div>
                  </div>

                  <Button variant="primary" className="w-full py-4 text-base md:text-lg font-bold shadow-[0_0_20px_rgba(138,43,226,0.4)] transform-gpu" onClick={handleConfirmPurchase}>
                    Confirm Transaction
                  </Button>
                </div>
              )}

              {/* STATE 3 & 4: SIGNING / PROCESSING */}
              {(txState === 'signing' || txState === 'processing') && (
                <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center">
                  <Loader2 size={60} className="text-primary animate-spin mb-6 md:mb-8" />
                  <h3 className="text-xl md:text-3xl font-bold font-display text-white mb-2 md:mb-3 leading-tight">
                    {txState === 'signing' ? 'Awaiting Signature' : 'Processing Transaction'}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto">
                    {txState === 'signing' 
                      ? 'Please open your wallet and sign the transaction request to proceed.' 
                      : 'Broadcasting to the Ethereum network. This usually takes a few seconds...'}
                  </p>
                </div>
              )}

              {/* STATE 5: SUCCESS */}
              {txState === 'success' && (
                <div className="flex flex-col items-center justify-center py-10 md:py-14 px-4 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                    <CheckCircle size={70} className="text-green-500 mb-6 md:mb-8 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-2 leading-tight">Transaction Successful!</h3>
                  <p className="text-gray-400 text-sm md:text-base mb-8 md:mb-10 max-w-sm mx-auto">
                    Congratulations! The blockchain has confirmed your purchase. You are now the verified owner of <span className="text-white font-bold">{nftData.title}</span>.
                  </p>
                  <Button variant="glass" className="w-full py-3 md:py-4 text-base" onClick={closeModal}>
                    Return to Gallery
                  </Button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NFTDetail;