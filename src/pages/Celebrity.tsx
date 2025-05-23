import React from "react";
import { designs as mockDesigns } from "@/data/mockData";

// Using the Design interface from our mock data
interface Design {
  id: string;
  title: string;
  images: string[];
  price: number;
  creator: {
    displayName: string;
    avatar: string;
  };
}

const Celebrity = () => {
  // Use mock data for celebrity styles
  const celebrityStyles = mockDesigns.slice(0, 6);
  const isLoading = false;
  const isError = false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8 flex justify-center items-center">
        <p>Loading celebrity styles...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8 flex justify-center items-center">
        <p>Error loading styles</p>
      </div>
    );
  }

  if (!celebrityStyles || celebrityStyles.length === 0) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Celebrity Spotted Styles</h1>
          <p>No celebrity styles found at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pl-16 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Celebrity Spotted Styles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {celebrityStyles.map((style) => (
            <div key={style.id} className="bg-black/30 rounded-xl overflow-hidden border border-white/10 flex animate-fade-in shadow-lg">
              <div className="aspect-[3/4] w-1/3 relative">
                <img
                  src={style.images && style.images.length > 0 ? style.images[0] : '/assets/fashion/placeholder.jpg'}
                  alt={style.title || 'Celebrity style'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <h3 className="font-bold text-lg">{style.title || 'Stylish Look'}</h3>
                <p className="text-sm text-white/70 mb-2">Spotted at Fashion Week</p>
                <p className="text-sm text-white/60 mb-2">by {style.creator.displayName}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <div className="bg-black/50 px-2 py-1 rounded text-xs text-white/70">
                    Designer
                  </div>
                  <div className="bg-black/50 px-2 py-1 rounded text-xs text-white/70">
                    Trending
                  </div>
                  <div className="bg-black/50 px-2 py-1 rounded text-xs text-white/70">
                    Celebrity
                  </div>
                </div>
                <button className="bg-white text-black text-sm font-medium px-3 py-1 rounded-full hover:bg-gray-100 transition-colors">
                  Shop Now - ${style.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Celebrity; 