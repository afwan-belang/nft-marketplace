import React from 'react';
import SellerItem from '../molecules/SellerItem';

const TopSellers = () => {
  // Dummy data kreator
  const sellers = [
    { id: 1, name: "Cripton Master", amount: "914", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" },
    { id: 2, name: "Rizky Art", amount: "842", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop" },
    { id: 3, name: "Susan Wiggins", amount: "720", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" },
    { id: 4, name: "Kelvin Cantrell", amount: "650", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" },
    { id: 5, name: "David Moore", amount: "530", avatar: "https://images.unsplash.com/photo-1528892952291-009c663ce843?q=80&w=150&auto=format&fit=crop" },
    { id: 6, name: "Jeremy Smith", amount: "410", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop" },
    { id: 7, name: "Anna Lopez", amount: "390", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150&auto=format&fit=crop" },
    { id: 8, name: "Tom Holland", amount: "280", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop" },
  ];

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
            Top Sellers
          </h2>
        </div>

        {/* Grid System Mobile-First */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {sellers.map((seller, index) => (
            <SellerItem 
              key={seller.id}
              rank={index + 1}
              name={seller.name}
              amount={seller.amount}
              avatar={seller.avatar}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopSellers;