import React from 'react';
import { m, LazyMotion, domAnimation } from 'framer-motion';
import Button from '../atoms/Button';

const HeroCard = () => {
  return (
    <div className="relative group w-full max-w-[360px] mx-auto lg:mx-0 z-10">

      {/* Background Glow (Aura) - Diperhalus agar tidak terlalu mencolok */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur-[100px] opacity-20 group-hover:opacity-40 transition duration-700 pointer-events-none"></div>

      {/* Card Body - Di sinilah keajaiban transisi warna border terjadi */}
      <LazyMotion features={domAnimation} strict>

        <m.div
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            borderWidth: '1px',
            borderStyle: 'solid',
          }}
          variants={{
            initial: {
              // Awal: Warna border SAMA PERSIS dengan background gelap (#070515)
              // Sehingga border seolah tidak ada / menyatu dengan background
              borderColor: "rgba(7, 5, 21, 1)",
            },
            animate: {
              // Akhir: Warna putih transparan khas glassmorphism
              borderColor: "rgba(255, 255, 255, 0.1)",
              transition: {
                duration: 2.5, // Durasi sangat panjang agar super smooth
                ease: [0.25, 0.1, 0.25, 1.0], // Kurva animasi kustom (elegan & tidak kaku)
                delay: 0.5 // Jeda sedikit agar konten dalam kartu muncul duluan
              }
            }
          }}
          initial="initial"
          className="bg-dark-bg/60 backdrop-blur-xl rounded-[2rem] relative overflow-hidden flex flex-col transition-shadow duration-300 shadow-[0_10px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_90px_rgba(138,43,226,0.3)]"
        >

          {/* Efek Kedalaman Latar Belakang Kaca */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none z-0"></div>

          {/* Image Container */}
          <div className="relative w-full h-[380px] rounded-2xl overflow-hidden mt-4 mx-4 z-10">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
              alt="Featured 3D NFT Art"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Floating Info Box */}
          <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex justify-between items-center shadow-lg z-20">
            <div className="flex flex-col">
              <span className="text-xs text-gray-300">Current Bid</span>
              <span className="text-white font-bold font-display text-lg">15.0 ETH</span>
            </div>
            <Button variant="primary" className="px-4 py-1.5 text-xs">
              Place Bid
            </Button>
          </div>
        </m.div>
      </LazyMotion>

    </div>
  );
};

export default HeroCard;