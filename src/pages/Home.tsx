
import React, { useState, useEffect } from "react";
import SwipeCard from "@/components/SwipeCard";
import { feedItems } from "@/data/mockData";
import { FeedItem } from "@/types";
import { toast } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Circle, Sparkles } from "lucide-react";

const Home = () => {
  const [currentItems, setCurrentItems] = useState<FeedItem[]>([]);
  const [savedItems, setSavedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  
  // Create a larger pool of items by duplicating the feed items multiple times with unique keys
  const generateMoreItems = (count: number): FeedItem[] => {
    const items: FeedItem[] = [];
    
    for (let i = 0; i < count; i++) {
      // Get a random item from feedItems and create a copy with a unique ID
      const randomIndex = Math.floor(Math.random() * feedItems.length);
      const originalItem = feedItems[randomIndex];
      
      // Deep clone the item and add a unique ID
      const newItem: FeedItem = {
        ...JSON.parse(JSON.stringify(originalItem)),
        id: `${originalItem.id}-${i}-${Date.now() + Math.random()}`,
      };
      
      items.push(newItem);
    }
    
    return items;
  };

  useEffect(() => {
    // Simulate loading data with a larger initial pool
    const timer = setTimeout(() => {
      // Load 15 random items initially for better variety
      setCurrentItems(generateMoreItems(15));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSwipeRight = (item: FeedItem) => {
    setSavedItems([...savedItems, item]);
    toast.success('Added to your favorites!', {
      description: `${item.title} has been saved to your collection`,
      action: {
        label: 'View',
        onClick: () => console.log('Viewing saved items'),
      },
    });
  };

  const handleSwipeLeft = (item: FeedItem) => {
    // Item skipped, do nothing specific
    toast.info('Item skipped', {
      description: 'Swipe right to save items you like',
      duration: 2000,
    });
  };

  const handleSwipeComplete = () => {
    // Remove the top item
    setCurrentItems(prev => {
      const newItems = [...prev];
      newItems.shift();
      
      // If we're getting low on items, add more
      if (newItems.length <= 5) {
        const additionalItems = generateMoreItems(10);
        console.log("Adding more items to the queue:", additionalItems.length);
        return [...newItems, ...additionalItems];
      }
      
      return newItems;
    });
  };

  const handleAIOutfit = (occasion: string) => {
    toast.success(`AI Style for ${occasion} generated!`, {
      description: "Creating personalized outfit recommendations...",
      duration: 3000,
    });
    
    // Add some new items to the queue that would be "AI recommended"
    const newItems = generateMoreItems(3).map(item => ({
      ...item,
      title: `${item.title} for ${occasion}`,
      aiRecommended: true
    }));
    
    setCurrentItems(prev => [...newItems, ...prev]);
  };

  return (
    <div className={`min-h-screen bg-background ${!isMobile ? 'pl-16' : 'pb-16'}`}>
      <div className="max-w-md mx-auto px-4 pt-6 pb-20 min-h-screen relative">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            Explore
            <Sparkles className="w-5 h-5 text-white/70 animate-pulse" />
          </h1>
          
          <div className="flex gap-2 items-center">
            <button 
              onClick={() => handleAIOutfit('party')}
              className="bg-white/10 backdrop-blur-sm p-2 rounded-full flex items-center justify-center border border-white/20 group hover:bg-white/20 transition-all duration-300"
              title="Get AI Style recommendations"
            >
              <Circle className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            </button>
            
            {savedItems.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full text-xs font-medium border border-white/20">
                {savedItems.length} saved
              </div>
            )}
          </div>
        </div>
        
        {/* AI Style Menu - Popup style */}
        <div className="absolute top-20 right-4 z-20 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl p-4 w-52 shadow-xl animate-fade-in">
          <h3 className="font-medium text-white mb-3 flex items-center gap-2">
            <Circle className="w-4 h-4" />
            AI Style
          </h3>
          <div className="space-y-2">
            {['Party', 'Work', 'Casual', 'Date', 'Formal'].map(occasion => (
              <button
                key={occasion} 
                onClick={() => handleAIOutfit(occasion.toLowerCase())}
                className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-white/10 text-white"
              >
                {occasion}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="h-[70vh] flex flex-col items-center justify-center">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse opacity-75" />
              <div className="w-14 h-14 m-1 rounded-full border-4 border-transparent border-t-white animate-spin" />
            </div>
            <p className="mt-4 text-white/70">Discovering amazing styles for you...</p>
          </div>
        ) : (
          <div className="h-[70vh] relative">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <SwipeCard
                  key={`${item.id}-${index}`}
                  item={item}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  onSwipeComplete={handleSwipeComplete}
                />
              )).slice(0, 3).reverse() // Only render top 3 cards for performance
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <p className="text-xl text-white/70">No more designs to show!</p>
                <button 
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-white to-white/90 text-black rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    const newItems = generateMoreItems(20);
                    setCurrentItems(newItems);
                    toast.success('Fresh styles loaded!');
                  }}
                >
                  Discover More Styles
                </button>
              </div>
            )}
            
            {/* Add engaging element at the bottom */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white/70 text-sm border border-white/10 animate-pulse-glow">
                Swipe to explore amazing styles
              </div>
            </div>
          </div>
        )}
        
        {/* Celebrity Outfits Carousel */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Celebrity Spotted
          </h2>
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-36 rounded-xl overflow-hidden border border-white/10 animate-pulse-glow">
                  <div className="aspect-[2/3] bg-black/60 relative">
                    <img 
                      src={`https://source.unsplash.com/random/300x450?fashion&${i}`}
                      alt="Celebrity outfit"
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-2">
                      <p className="text-xs font-medium text-white">Celebrity {i+1}</p>
                      <p className="text-[10px] text-white/70">$299 to recreate</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
