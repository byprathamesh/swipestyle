import React, { useState, useEffect } from "react";

// Define a type for your design data from Supabase
// This should ideally match your Supabase table structure or be generated
interface Design {
  id: string;
  title: string | null;
  images: string[] | null; // Assuming images are stored as an array of URLs/paths
  price: number | null;
  // Add other fields like user_id, creator details if you fetch them
  // For example, if you join with a profiles table:
  // profiles?: { display_name: string | null; avatar_url: string | null; } | null;
}

const Saved = () => {
  const [savedItems, setSavedItems] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading saved items from localStorage
    const loadSavedItems = () => {
      try {
        const saved = localStorage.getItem('savedFashionItems');
        if (saved) {
          setSavedItems(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Error loading saved items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(loadSavedItems, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8 flex justify-center items-center">
        <p>Loading your saved styles...</p>
      </div>
    );
  }

  if (!savedItems || savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Saved Styles</h1>
          <div className="text-center py-12">
            <p className="text-lg text-white/70 mb-4">No saved styles yet</p>
            <p className="text-white/50">Start swiping right on styles you love!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pl-16 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Saved Styles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.map((item) => (
            <div key={item.id} className="bg-black/30 rounded-xl overflow-hidden border border-white/10 animate-fade-in">
              <div className="aspect-[3/4] relative">
                <img
                  src={item.images && item.images.length > 0 ? item.images[0] : '/assets/fashion/placeholder.jpg'}
                  alt={item.title || 'Saved style'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{item.title || 'Stylish Look'}</h3>
                {item.price && (
                  <p className="text-white/70 mb-3">${item.price.toFixed(2)}</p>
                )}
                <button className="w-full bg-white text-black text-sm font-medium py-2 rounded-full hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Saved; 