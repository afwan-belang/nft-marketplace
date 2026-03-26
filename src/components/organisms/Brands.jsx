import React from 'react';

const Brands = () => {
  // Kita buat hurufnya kapital semua sebagai basis
  const brands = [
    "COINBASE", "BINANCE", "METAMASK", "TRUST WALLET", 
    "PAYPAL", "OPENSEA", "ETHEREUM", "POLYGON", "SOLANA"
  ];

  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    // PERBAIKAN 1: py-8 diubah menjadi py-4 md:py-5 agar pita (ribbon) ini lebih langsing
    <section className="py-4 md:py-5 border-y border-white/5 overflow-hidden relative z-10 bg-dark-bg/50 backdrop-blur-sm">
      
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); } 
          }
          
          .animate-ticker {
            display: flex;
            width: max-content;
            /* PERBAIKAN 2: Diperlambat dari 30s ke 40s agar putarannya lebih tenang & elegan */
            animation: scroll 40s linear infinite; 
          }
          
          .animate-ticker:hover {
            animation-play-state: paused;
          }

          .mask-edges {
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }
        `}
      </style>

      <div className="max-w-7xl mx-auto relative mask-edges">
        {/* PERBAIKAN 3: py-4 pada div ini dihapus agar tidak menambah tinggi ekstra. Jarak antar item (gap) dilebarkan. */}
        <div className="animate-ticker gap-16 md:gap-28 items-center cursor-pointer">
          
          {duplicatedBrands.map((brand, index) => (
            <div 
              key={index}
              /* PERBAIKAN 4 (TIPOGRAFI PREMIUM): 
                 - text-white/30 (lebih redup saat diam)
                 - text-sm md:text-base (ukuran lebih kecil dan berkelas)
                 - tracking-[0.2em] (jarak antar huruf direnggangkan ekstrim)
                 - hover:scale-105 (efek membesar dibuat lebih halus)
              */
              className="text-white/30 hover:text-white hover:scale-105 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] font-display font-bold text-sm md:text-base tracking-[0.2em] transition-all duration-500"
            >
              {brand}
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Brands;