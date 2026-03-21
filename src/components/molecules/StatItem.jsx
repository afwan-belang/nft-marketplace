import React, { memo } from 'react'; // Import memo

const StatItem = ({ value, label }) => {
  return (
    <div className="flex flex-col">
      <span className="text-xl md:text-2xl lg:text-3xl font-bold font-display text-white">
        {value}
      </span>
      <span className="text-xs md:text-sm text-gray-400 mt-1">
        {label}
      </span>
    </div>
  );
};

export default memo(StatItem); // Bungkus saat export