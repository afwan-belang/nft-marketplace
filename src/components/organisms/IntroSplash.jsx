import React from 'react';
import { motion } from 'framer-motion';
import ScrollIndicator from '../atoms/ScrollIndicator';

const IntroSplash = () => {
  return (
    // PERUBAHAN 1: Gunakan h-[100dvh] agar akurat di browser mobile
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-dark-bg z-10">
      
      {/* PERUBAHAN 2: Ukuran efek cahaya disesuaikan untuk layar kecil (menggunakan vw) */}
      <div className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[150vw] md:w-[800px] h-[150vw] md:h-[800px] bg-gradient-to-t from-primary/30 via-secondary/10 to-transparent rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>
      
      <div className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[100vw] md:w-[80vw] h-[50vh] border-t border-white/5 rounded-[100%] pointer-events-none"></div>

      <div className="z-10 flex flex-col items-center gap-3 md:gap-4 text-center px-4 -mt-16 md:-mt-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-6 leading-none"
        >
          {/* PERUBAHAN 3: Teks mengecil di mobile, dan akan turun ke bawah (flex-col) jika layar sangat sempit */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black font-display tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            PLAY
          </h1>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black font-display tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_30px_rgba(138,43,226,0.3)]">
            NFT
          </h1>
        </motion.div>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          // PERUBAHAN 4: Jarak antar huruf (tracking) dikurangi sedikit di mobile agar tidak terpotong
          className="text-[10px] sm:text-xs md:text-lg text-gray-400 font-light tracking-[0.2em] md:tracking-[0.3em] uppercase mt-2 md:mt-0"
        >
          The Future of Digital Assets
        </motion.p>
      </div>

      <ScrollIndicator targetId="home" />
      
    </section>
  );
};

export default IntroSplash;