import React from 'react';

const Brands = () => {
  const brands = [
    { name: 'PayPal', font: 'font-sans italic font-bold' },
    { name: 'coinbase', font: 'font-sans font-bold text-xl' },
    { name: 'BINANCE', font: 'font-display font-bold tracking-wider' },
    { name: 'Revolut', font: 'font-sans font-semibold text-lg' },
    { name: 'BITFINEX', font: 'font-display font-medium tracking-widest' },
    { name: 'BlockFi', font: 'font-sans font-bold' },
  ];

  return (
    <div className="w-full border-y border-white/5 bg-white/[0.02] py-6 mt-10 lg:mt-0 backdrop-blur-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Mobile: Horizontal Scroll, Desktop: Flex Space Between */}
        <div className="flex items-center gap-10 md:justify-between overflow-x-auto no-scrollbar snap-x">
          {brands.map((brand, index) => (
            <div 
              key={index} 
              className={`text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer snap-center whitespace-nowrap ${brand.font}`}
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;