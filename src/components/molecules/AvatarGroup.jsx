import React from 'react';

const AvatarGroup = () => {
  // Dummy avatar dari Unsplash untuk visualisasi
  const avatars = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  ];

  return (
    <div className="flex items-center gap-4 mt-2">
      <div className="flex -space-x-3">
        {avatars.map((src, idx) => (
          <img 
            key={idx}
            src={src} 
            alt="User avatar" 
            className="w-10 h-10 rounded-full border-2 border-dark-bg object-cover"
          />
        ))}
      </div>
      <div className="flex flex-col">
        <span className="text-white font-bold font-display">40K +</span>
        <span className="text-xs text-gray-400">Active users</span>
      </div>
    </div>
  );
};

export default AvatarGroup;