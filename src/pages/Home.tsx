
import React, { useState, useEffect } from "react";
import SwipeCard from "@/components/SwipeCard";
import ContentToggle from "@/components/ContentToggle";
import { feedItems } from "@/data/mockData";
import { FeedItem } from "@/types";
import { toast } from "@/components/ui/sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sparkles,
  Heart,
  ShoppingBag,
  Tag
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Fashion image URLs - using random fashion images from Unsplash
const fashionImages = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
  "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&q=80",
  "https://images.unsplash.com/photo-1566491888763-e71518bbe846?w=800&q=80"
];

// Video thumbnails for GRWM content
const grwmImages = [
  "https://images.unsplash.com/photo-1604904612715-47bf142e7af3?w=800&q=80",
  "https://images.unsplash.com/photo-1596442127435-f4e97364cf43?w=800&q=80",
  "https://images.unsplash.com/photo-1618001789159-ffffe6f96ef2?w=800&q=80",
  "https://images.unsplash.com/photo-1627483298235-f3bac2567c1c?w=800&q=80",
  "https://images.unsplash.com/photo-1596240898540-115bc4fa9f14?w=800&q=80",
  "https://images.unsplash.com/photo-1565052424785-6dcdf0f10c19?w=800&q=80",
  "https://images.unsplash.com/photo-1530041539828-114de669390e?w=800&q=80",
  "https://images.unsplash.com/photo-1511929825537-516974a253df?w=800&q=80",
  "https://images.unsplash.com/photo-1562572159-4efc207f5aff?w=800&q=80",
  "https://images.unsplash.com/photo-1516914589923-f105f1535f88?w=800&q=80"
];

const Home = () => {
  const [currentItems, setCurrentItems] = useState<FeedItem[]>([]);
  const [savedItems, setSavedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [contentType, setContentType] = useState<"pictures" | "videos">("pictures");
  const [showAIMenu, setShowAIMenu] = useState(false);
  const isMobile = useIsMobile();
  
  // Create a larger pool of items by enhancing the feed items with our random fashion images
  const generateMoreItems = (count: number, type: "pictures" | "videos" = "pictures"): FeedItem[] => {
    const items: FeedItem[] = [];
    const imageSource = type === "pictures" ? fashionImages : grwmImages;
    
    for (let i = 0; i < count; i++) {
      // Get a random item from feedItems and create a copy with a unique ID
      const randomIndex = Math.floor(Math.random() * feedItems.length);
      const originalItem = feedItems[randomIndex];
      
      // Select a random image from our collection
      const randomImageIndex = Math.floor(Math.random() * imageSource.length);
      
      // Deep clone the item and add a unique ID
      const newItem: FeedItem = {
        ...JSON.parse(JSON.stringify(originalItem)),
        id: `${originalItem.id}-${i}-${Date.now() + Math.random()}`,
        isVideo: type === "videos",
        shoppingOptions: {
          buy: true,
          thrift: Math.random() > 0.3,
          rent: Math.random() > 0.6
        }
      };

      // Replace the image with our random fashion image
      if ("images" in newItem) {
        newItem.images = [imageSource[randomImageIndex]];
      } else if (newItem.items && newItem.items.length > 0) {
        newItem.items[0].image = imageSource[randomImageIndex];
      }

      // Add some variety to titles for videos
      if (type === "videos") {
        const prefixes = ["GRWM:", "Get Ready With Me:", "Styling:", "My Look:"];
        const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        newItem.title = `${randomPrefix} ${newItem.title}`;
      }
      
      items.push(newItem);
    }
    
    return items;
  };

  useEffect(() => {
    // Simulate loading data with a larger initial pool
    const timer = setTimeout(() => {
      // Load random items initially for better variety
      setCurrentItems(generateMoreItems(15, contentType));
      setLoading(false);
    }, 600); // Reduced loading time for better UX

    return () => clearTimeout(timer);
  }, [contentType]);

  // Show a toast when the page loads to guide the user
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info('Swipe right to save items you like', {
        description: 'Discover fashion that matches your style',
        duration: 3000,
      });
    }, 1500);
    
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
        const additionalItems = generateMoreItems(10, contentType);
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
    const newItems = generateMoreItems(3, contentType).map(item => ({
      ...item,
      title: `${item.title} for ${occasion}`,
      aiRecommended: true
    }));
    
    setCurrentItems(prev => [...newItems, ...prev]);
    setShowAIMenu(false);
  };

  const handleContentToggle = (type: "pictures" | "videos") => {
    if (type === contentType) return;
    
    setContentType(type);
    setLoading(true);
    
    // Reset cards and load new content
    setTimeout(() => {
      setCurrentItems(generateMoreItems(15, type));
      setLoading(false);
      
      toast.info(
        type === "pictures" 
          ? "Showing outfit inspirations" 
          : "Showing Get Ready With Me videos",
        { duration: 2000 }
      );
    }, 800);
  };

  // Check if we need to load initial items when current items are empty
  useEffect(() => {
    if (!loading && currentItems.length === 0) {
      setCurrentItems(generateMoreItems(15, contentType));
    }
  }, [currentItems.length, loading, contentType]);

  return (
    <div className={`min-h-screen bg-background ${!isMobile ? 'pl-16' : 'pb-16'}`}>
      <div className="max-w-md mx-auto px-4 pt-6 pb-20 min-h-screen relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            Explore
            <Sparkles className="w-5 h-5 text-white/70 animate-pulse" />
          </h1>
          
          <div className="flex gap-3 items-center">
            {/* AI Style Button with your logo */}
            <DropdownMenu open={showAIMenu} onOpenChange={setShowAIMenu}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost"
                  className="bg-white/10 backdrop-blur-sm p-2 rounded-full flex items-center justify-center border border-white/20 group hover:bg-white/20 transition-all duration-300"
                  title="Get AI Style recommendations"
                >
                  <Sparkles className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/80 backdrop-blur-md border border-white/20 rounded-xl shadow-xl animate-fade-in text-white min-w-[180px]">
                <div className="px-3 py-2 text-sm font-medium border-b border-white/10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Style
                </div>
                {['Party', 'Work', 'Casual', 'Date', 'Formal'].map(occasion => (
                  <DropdownMenuItem 
                    key={occasion}
                    className="py-2 text-sm cursor-pointer hover:bg-white/10 focus:bg-white/10"
                    onClick={() => handleAIOutfit(occasion.toLowerCase())}
                  >
                    {occasion}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Content type toggle */}
            <ContentToggle 
              activeTab={contentType} 
              onToggle={handleContentToggle} 
            />
            
            {savedItems.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-full text-xs font-medium border border-white/20 flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {savedItems.length}
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
              )).slice(0, 3).reverse() // Only render top 3 cards for performance
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <p className="text-xl text-white/70">No more designs to show!</p>
                <Button 
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-white to-white/90 text-black rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    const newItems = generateMoreItems(20, contentType);
                    setCurrentItems(newItems);
                    toast.success('Fresh styles loaded!');
                  }}
                >
                  Discover More Styles
                </Button>
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
          <Carousel className="w-full">
            <CarouselContent className="-ml-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <CarouselItem key={i} className="pl-2 basis-1/3 md:basis-1/3">
                  <div className="flex-shrink-0 rounded-xl overflow-hidden border border-white/10 animate-fade-in">
                    <div className="aspect-[2/3] bg-black/60 relative">
                      <img 
                        src={`https://source.unsplash.com/random/300x450?fashion,celebrity&${i}`}
                        alt="Celebrity outfit"
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm p-2">
                        <p className="text-xs font-medium text-white">Celebrity {i+1}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-[10px] text-white/70">$299</p>
                          <Button variant="link" size="sm" className="text-[10px] h-auto p-0 text-white/90">
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-end gap-1 mt-2">
              <CarouselPrevious className="relative static left-0 right-auto h-7 w-7" />
              <CarouselNext className="relative static right-0 h-7 w-7" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;
