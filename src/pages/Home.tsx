
import React, { useState, useEffect } from "react";
import SwipeCard from "@/components/SwipeCard";
import { feedItems } from "@/data/mockData";
import { FeedItem } from "@/types";
import { toast } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";

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
        id: `${originalItem.id}-${i}-${Date.now()}`,
      };
      
      items.push(newItem);
    }
    
    return items;
  };

  useEffect(() => {
    // Simulate loading data with a larger initial pool
    const timer = setTimeout(() => {
      // Load 10 random items initially
      setCurrentItems(generateMoreItems(10));
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
  };

  const handleSwipeComplete = () => {
    // Remove the top item
    setCurrentItems(prev => {
      const newItems = [...prev];
      newItems.shift();
      
      // If we're getting low on items, add more
      if (newItems.length <= 5) {
        return [...newItems, ...generateMoreItems(5)];
      }
      
      return newItems;
    });
  };

  return (
    <div className={`min-h-screen bg-background ${!isMobile ? 'pl-16' : 'pb-16'}`}>
      <div className="max-w-md mx-auto px-4 pt-6 pb-20 min-h-screen relative">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Explore</h1>
          <div className="flex gap-2">
            {/* Filter button would go here */}
          </div>
        </div>
        
        {loading ? (
          <div className="h-[70vh] flex flex-col items-center justify-center">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse opacity-75" />
              <div className="w-14 h-14 m-1 rounded-full border-4 border-transparent border-t-white animate-spin" />
            </div>
            <p className="mt-4 text-muted-foreground">Loading amazing designs for you...</p>
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
                <p className="text-xl text-muted-foreground">No more designs to show!</p>
                <button 
                  className="mt-4 px-6 py-3 bg-white text-black rounded-full font-medium"
                  onClick={() => setCurrentItems(generateMoreItems(10))}
                >
                  Load More Designs
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
