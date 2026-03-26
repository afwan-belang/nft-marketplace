import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Eye, Clock, Tag, AlignLeft, List, X, CheckCircle, Wallet, ChevronRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import Button from '../components/atoms/Button';
import LiveChart from '../components/molecules/LiveChart';
// IMPORT ZUSTAND STORE
import useUserStore from '../store/useUserStore';

const NFTDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Ambil state dan fungsi dari Zustand
  const { balance, buyNFT, collectedNFTs } = useUserStore();

  const nftData = {
    title: id ? id.replace(/-/g, ' ').toUpperCase() : 'UNKNOWN NFT',
    author: "mary_jane",
    price: 2.45,
    usdPrice: "$8,542.10",
    likes: "12.4K",
    views: "45.2K",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    description: "An exclusive digital manifestation of divine neon energy. This 1/1 artwork represents the genesis of the cyberpunk era in the Ethereum blockchain.",
    accentColor: "#a855f7",
    properties: [
      { type: "Background", value: "Deep Void", rarity: "8%" },
      { type: "Aura", value: "Neon Purple", rarity: "12%" },
      { type: "Entity", value: "Cyber God", rarity: "2%" }
    ]
  };

  // Cek apakah NFT ini sudah ada di daftar "collected" milik user
  const isOwned = collectedNFTs.some(item => item.title === nftData.title);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [txState, setTxState] = useState('idle'); 

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
    // Validasi Saldo sebelum melanjutkan
    if (balance < nftData.price + 0.015) {
      alert("Insufficient ETH Balance!");
      return;
    }

    setTxState('signing'); 
    setTimeout(() => {
      setTxState('processing'); 
      setTimeout(() => {
        // EKSEKUSI ZUSTAND: Pindahkan NFT ke profil user dan potong saldo!
        buyNFT(nftData);
        setTxState('success'); 
      }, 3000); 
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="pt-24 md:pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          
          <div className="w-full lg:w-2/5 flex flex-col gap-6">
            <div className="glass-panel rounded-3xl p-2 overflow-hidden border border-white/10 relative group">
              <div className="absolute top-4 right-4 z-10 bg-dark-bg/60 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/10">
                <Heart size={16} className="text-gray-400" />
                <span className="text-xs text-white font-medium">{nftData.likes}</span>
              </div>
              <img src={nftData.image} alt={nftData.title} className="w-full h-auto aspect-square object-cover rounded-2xl" />
            </div>
          </div>

          <div className="w-full lg:w-3/5 flex flex-col">
            <h1 className="text-3xl md:text-5xl font-black font-display text-white mb-4 mt-2 md:mt-0 leading-tight">
              {nftData.title}
            </h1>
            
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
                {/* JIKA SUDAH DIMILIKI, TOMBOL BERUBAH */}
                {isOwned ? (
                   <Button variant="glass" className="w-full py-3 md:py-4 text-base md:text-lg border-green-500/50 text-green-400 bg-green-500/10 cursor-default">
                    <CheckCircle size={18} className="mr-2 inline" /> Owned
                  </Button>
                ) : (
                  <Button variant="primary" className="w-full sm:flex-1 py-3 md:py-4 text-base md:text-lg" onClick={handleInitiateBuy}>
                    <Tag size={18} className="mr-2 inline" /> Buy Now
                  </Button>
                )}
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
          </div>
        </div>
      </motion.div>

      {/* MODAL TRANSAKSI */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex justify-center items-center pointer-events-none px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto transform-gpu" />

            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-lg bg-dark-bg/90 border border-white/10 rounded-3xl p-6 md:p-8 relative z-10 pointer-events-auto shadow-2xl overflow-hidden transform-gpu">
              
              <button onClick={closeModal} disabled={txState === 'signing' || txState === 'processing'} className="absolute top-4 md:top-5 right-4 md:right-5 text-gray-500 hover:text-white disabled:opacity-0 transition-all p-1.5 bg-white/5 rounded-full z-20">
                <X size={18} />
              </button>

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
                  </div>
                </div>
              )}

              {txState === 'review' && (
                <div className="py-2">
                  <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-6 text-center">Checkout Review</h3>
                  
                  {/* Warning jika ETH tidak cukup */}
                  {balance < (nftData.price + 0.015) && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4 flex items-start gap-3">
                      <AlertCircle className="text-red-500 shrink-0" size={18} />
                      <p className="text-xs md:text-sm text-red-400">Your wallet balance ({balance.toFixed(2)} ETH) is insufficient to cover the cost and gas fee.</p>
                    </div>
                  )}

                  <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-3 md:p-4 mb-6 border border-white/10">
                    <img src={nftData.image} alt="NFT" className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="text-[10px] md:text-xs text-primary font-bold mb-1 tracking-wider">PLAY NFT COLLECTION</div>
                      <div className="text-white font-medium leading-tight text-base md:text-lg">{nftData.title}</div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 px-1 md:px-2">
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-gray-400">Wallet Balance</span>
                      <span className="text-green-400 font-medium">{balance.toFixed(3)} ETH</span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-gray-400">Estimated Gas Fee</span>
                      <span className="text-white font-medium">0.015 ETH</span>
                    </div>
                    <div className="w-full h-px bg-white/10 my-2"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-bold md:text-lg">Total Request</span>
                      <div className="text-right">
                        <div className="text-primary font-bold text-xl md:text-2xl">{(nftData.price + 0.015).toFixed(3)} ETH</div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant={balance < (nftData.price + 0.015) ? "glass" : "primary"} 
                    className={`w-full py-4 text-base md:text-lg font-bold ${balance < (nftData.price + 0.015) ? 'opacity-50 cursor-not-allowed' : 'shadow-[0_0_20px_rgba(138,43,226,0.4)]'}`} 
                    onClick={balance >= (nftData.price + 0.015) ? handleConfirmPurchase : null}
                  >
                    {balance < (nftData.price + 0.015) ? 'Insufficient Funds' : 'Confirm Transaction'}
                  </Button>
                </div>
              )}

              {(txState === 'signing' || txState === 'processing') && (
                <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center">
                  <Loader2 size={60} className="text-primary animate-spin mb-6 md:mb-8" />
                  <h3 className="text-xl md:text-3xl font-bold font-display text-white mb-2 md:mb-3 leading-tight">
                    {txState === 'signing' ? 'Awaiting Signature' : 'Processing Transaction'}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base max-w-xs mx-auto">
                    {txState === 'signing' ? 'Please open your wallet and sign the transaction request.' : 'Broadcasting to the Ethereum network...'}
                  </p>
                </div>
              )}

              {txState === 'success' && (
                <div className="flex flex-col items-center justify-center py-10 md:py-14 px-4 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
                    <CheckCircle size={70} className="text-green-500 mb-6 md:mb-8 drop-shadow-[0_0_20px_rgba(34,197,94,0.4)]" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-2 leading-tight">Transaction Successful!</h3>
                  <p className="text-gray-400 text-sm md:text-base mb-8 md:mb-10 max-w-sm mx-auto">
                    Congratulations! You are now the verified owner of <span className="text-white font-bold">{nftData.title}</span>.
                  </p>
                  <Button variant="glass" className="w-full py-3 md:py-4 text-base" onClick={() => navigate('/profile')}>
                    View in Profile
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