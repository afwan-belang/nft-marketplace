import React from 'react';
import { motion } from 'framer-motion';
import ScrollIndicator from '../atoms/ScrollIndicator';

const IntroSplash = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-dark-bg z-10">
      
      {/* Efek Cahaya / Planet di latar belakang (Mengikuti referensi XLSMART) */}
      <div className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-t from-primary/30 via-secondary/10 to-transparent rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Garis orbit tipis (opsional, untuk menambah estetika futuristik) */}
      <div className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[100vw] md:w-[80vw] h-[50vh] border-t border-white/5 rounded-[100%] pointer-events-none"></div>

      {/* Konten Tengah (Logo Besar) */}
      <div className="z-10 flex flex-col items-center gap-4 text-center px-4 -mt-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          {/* Logo Text Besar */}
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black font-display tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            PLAY <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">NFT</span>
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-sm md:text-lg text-gray-400 font-light tracking-[0.3em] uppercase"
        >
          The Future of Digital Assets
        </motion.p>
      </div>

      {/* Indikator Mouse Scroll mengarah ke ID 'home' (Hero Asli Anda) */}
      <ScrollIndicator targetId="home" />
      
    </section>
  );
};

export default IntroSplash;