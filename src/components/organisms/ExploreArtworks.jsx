import React from 'react';
import ExploreCard from '../molecules/ExploreCard';

const ExploreArtworks = () => {
  // Data dummy kategori artwork
  const categories = [
    { id: 1, title: "Abstract", items: "12 Items", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop" },
    { id: 2, title: "3D Art", items: "8 Items", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "Modern Art", items: "24 Items", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "Game", items: "15 Items", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop" },
    { id: 5, title: "Sci-Fi", items: "9 Items", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop" },
    { id: 6, title: "Watercolor", items: "31 Items", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <section className="py-16 relative z-10" id="explore">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
            Explore Artworks
          </h2>
        </div>

        {/* Grid Layout untuk Artworks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <ExploreCard 
              key={cat.id}
              title={cat.title}
              itemsCount={cat.items}
              image={cat.image}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExploreArtworks;