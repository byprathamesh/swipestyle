
import React, { useState, useEffect } from "react";
import SwipeCard from "@/components/SwipeCard";
import { feedItems } from "@/data/mockData";
import { FeedItem } from "@/types";
import { toast } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sparkles } from "lucide-react";

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

  return (
    <div className={`min-h-screen bg-background ${!isMobile ? 'pl-16' : 'pb-16'}`}>
      <div className="max-w-md mx-auto px-4 pt-6 pb-20 min-h-screen relative">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            Explore
            <Sparkles className="w-5 h-5 text-white/70 animate-pulse" />
          </h1>
          <div className="flex gap-2">
            {savedItems.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full text-xs font-medium border border-white/20">
                {savedItems.length} saved
              </div>
            )}
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
              )).reverse()
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
              <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white/70 text-sm border border-white/10">
                Swipe to explore amazing styles
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
