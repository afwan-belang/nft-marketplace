import React from 'react';

const SellerItem = ({ avatar, name, amount, rank }) => {
  return (
    <div className="flex items-center gap-4 p-3 lg:p-4 rounded-2xl glass-panel bg-white/[0.02] hover:bg-white/10 transition-all duration-300 cursor-pointer group border border-white/5 hover:border-white/20">
      {/* Rank Number (Optional detail) */}
      <span className="text-gray-500 font-display font-bold text-sm w-4 text-center group-hover:text-primary transition-colors">
        {rank}
      </span>
      
      {/* Avatar dengan efek zoom ringan */}
      <div className="relative overflow-hidden rounded-full w-12 h-12 flex-shrink-0">
        <img 
          src={avatar} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Info Kreator */}
      <div className="flex flex-col overflow-hidden">
        <h4 className="text-white font-bold text-sm lg:text-base truncate group-hover:text-primary transition-colors">
          {name}
        </h4>
        <p className="text-gray-400 text-xs mt-0.5">{amount} ETH</p>
      </div>
    </div>
  );
};

export default SellerItem;