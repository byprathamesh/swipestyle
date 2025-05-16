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
import SwipeStyleLogo from "@/components/SwipeStyleLogo";

// Fashion image URLs - using only local fashion images
const fashionImages = [
  "/assets/fashion/fashion1.jpg",
  "/assets/fashion/fashion2.jpg",
  "/assets/fashion/fashion3.jpg",
  "/assets/fashion/fashion4.jpg",
  "/assets/fashion/fashion5.jpg",
  "/assets/fashion/fashion6.jpg",
  "/assets/fashion/fashion7.jpg",
  "/assets/fashion/fashion8.jpg",
  "/assets/fashion/fashion9.jpg",
  "/assets/fashion/fashion10.jpg",
  "/assets/fashion/fashion11.jpg",
  "/assets/fashion/fashion12.jpg",
  "/assets/fashion/fashion13.jpg",
  "/assets/fashion/fashion14.jpg",
];

// Video thumbnails for GRWM content - also using local fashion images
const grwmImages = [
  "/assets/fashion/fashion1.jpg",
  "/assets/fashion/fashion2.jpg",
  "/assets/fashion/fashion3.jpg",
  "/assets/fashion/fashion4.jpg",
  "/assets/fashion/fashion5.jpg",
  "/assets/fashion/fashion6.jpg",
  "/assets/fashion/fashion7.jpg",
];

const categories = [
  "All",
  "Streetwear",
  "Formal",
  "Vintage",
  "Party",
  "Shoes",
  "Outerwear",
  "Accessories",
  "Runway",
  "Editorial",
  "Men",
  "Women"
];

const categoryKeywords: Record<string, string[]> = {
  Streetwear: ["street", "urban"],
  Formal: ["formal", "suit", "dress"],
  Vintage: ["vintage", "retro", "classic"],
  Party: ["party", "night", "club"],
  Shoes: ["shoes", "boots", "sneaker", "platform"],
  Outerwear: ["jacket", "coat", "outerwear", "pullover"],
  Accessories: ["accessory", "bag", "hat", "scarf"],
  Runway: ["runway", "fashion week"],
  Editorial: ["editorial", "magazine"],
  Men: ["men", "male", "guy"],
  Women: ["women", "female", "girl"]
};

const Home = () => {
  const [currentItems, setCurrentItems] = useState<FeedItem[]>([]);
  const [savedItems, setSavedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [contentType, setContentType] = useState<"pictures" | "videos">("pictures");
  const [showAIMenu, setShowAIMenu] = useState(false);
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [likedCategories, setLikedCategories] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('likedCategories') || '[]');
    } catch {
      return [];
    }
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('uploadedImages') || '[]');
    } catch {
      return [];
    }
  });
  
  // Helper to filter images by category
  const filterImagesByCategory = (images: string[], category: string) => {
    if (category === "All") return images;
    const keywords = categoryKeywords[category] || [];
    return images.filter(url =>
      keywords.some(kw => url.toLowerCase().includes(kw))
    );
  };

  // Update localStorage when uploadedImages changes
  useEffect(() => {
    localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
  }, [uploadedImages]);

  // Add uploaded images to the image pool
  const getImageSource = (type: "pictures" | "videos", category: string) => {
    let base = type === "pictures" ? fashionImages : grwmImages;
    if (uploadedImages.length > 0 && (category === 'All' || category === 'User Uploads')) {
      base = [...uploadedImages, ...base];
    }
    return filterImagesByCategory(base, category);
  };

  // Updated generateMoreItems to respect selectedCategory
  const generateMoreItems = (count: number, type: "pictures" | "videos" = "pictures", category: string = selectedCategory): FeedItem[] => {
    const items: FeedItem[] = [];
    let imageSource = getImageSource(type, category);
    if (imageSource.length === 0) imageSource = getImageSource(type, 'All');
    
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
      setCurrentItems(generateMoreItems(15, contentType, selectedCategory));
      setLoading(false);
    }, 600); // Reduced loading time for better UX

    return () => clearTimeout(timer);
  }, [contentType, selectedCategory]);

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

  // Update localStorage when likedCategories changes
  useEffect(() => {
    localStorage.setItem('likedCategories', JSON.stringify(likedCategories));
  }, [likedCategories]);

  // Helper to get a random category, favoring likedCategories
  const getRandomCategory = () => {
    if (likedCategories.length > 0 && Math.random() < 0.7) {
      return likedCategories[Math.floor(Math.random() * likedCategories.length)];
    }
    return categories[Math.floor(Math.random() * categories.length)];
  };

  // Infinite swiping: when currentItems is low, load more
  useEffect(() => {
    if (!loading && currentItems.length <= 5) {
      setCurrentItems(prev => ([
        ...prev,
        ...generateMoreItems(10, contentType, getRandomCategory())
      ]));
    }
  }, [currentItems.length, loading, contentType, selectedCategory]);

  // When user swipes right, update likedCategories
  const handleSwipeRight = (item: FeedItem) => {
    setSavedItems([...savedItems, item]);
    // Try to infer category from image URL or tags
    let cat = selectedCategory;
    if (cat === 'All' && item.title) {
      for (const c of categories) {
        if (c !== 'All' && item.title.toLowerCase().includes(c.toLowerCase())) {
          cat = c;
          break;
        }
      }
    }
    if (cat !== 'All' && !likedCategories.includes(cat)) {
      setLikedCategories([...likedCategories, cat]);
    }
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
        const additionalItems = generateMoreItems(10, contentType, selectedCategory);
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
    const newItems = generateMoreItems(3, contentType, selectedCategory).map(item => ({
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
      setCurrentItems(generateMoreItems(15, type, selectedCategory));
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
      setCurrentItems(generateMoreItems(15, contentType, selectedCategory));
    }
  }, [currentItems.length, loading, contentType, selectedCategory]);

  // Add AI Outfit Generation logic
  const [aiLoading, setAiLoading] = useState(false);
  const handleAIGenerate = () => {
    setAiLoading(true);
    setTimeout(() => {
      // Simulate 3 new AI-generated outfits
      const aiItems = generateMoreItems(3, contentType, selectedCategory).map(item => ({
        ...item,
        title: `AI Generated: ${item.title}`,
        aiRecommended: true
      }));
      setCurrentItems(prev => [...aiItems, ...prev]);
      setAiLoading(false);
      toast.success('AI Outfits generated!', { description: 'Check out your new AI-inspired looks!' });
      // Haptic feedback
      if (window.navigator.vibrate) window.navigator.vibrate(100);
    }, 1200);
  };

  // Add haptic feedback and subtle swipe animation for mobile
  const handleSwipeRightWithHaptics = (item: FeedItem) => {
    if (window.navigator.vibrate) window.navigator.vibrate(50);
    handleSwipeRight(item);
  };
  const handleSwipeLeftWithHaptics = (item: FeedItem) => {
    if (window.navigator.vibrate) window.navigator.vibrate(30);
    handleSwipeLeft(item);
  };

  return (
    <div className={`min-h-screen bg-background ${!isMobile ? 'pl-16' : 'pb-16'}`}>
      <div className="max-w-md mx-auto px-4 pt-6 pb-20 min-h-screen relative">
        {/* Top bar: Explore/Logo/ContentToggle left, AI Outfit Generation right */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">Explore</h1>
            <SwipeStyleLogo size="sm" />
            <ContentToggle activeTab={contentType} onToggle={handleContentToggle} />
          </div>
          <button
            className="flex items-center gap-2 px-4 py-1.5 rounded-full font-medium text-sm bg-gradient-to-r from-pink-500 to-yellow-400 text-white shadow hover:scale-105 transition-transform duration-200 disabled:opacity-60"
            onClick={handleAIGenerate}
            disabled={aiLoading}
          >
            <Sparkles className="w-4 h-4" />
            {aiLoading ? 'Generating...' : 'AI Outfit Generation'}
          </button>
        </div>
        {/* Swipe card area, more mobile friendly */}
        {loading ? (
          <div className="h-[60vh] flex flex-col items-center justify-center">
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse opacity-75" />
              <div className="w-14 h-14 m-1 rounded-full border-4 border-transparent border-t-white animate-spin" />
            </div>
            <p className="mt-4 text-white/70">Discovering amazing styles for you...</p>
          </div>
        ) : (
          <div className="h-[60vh] w-full max-w-xs sm:max-w-md mx-auto relative flex items-center justify-center">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <SwipeCard
                  key={`${item.id}-${index}`}
                  item={item}
                  onSwipeLeft={handleSwipeLeftWithHaptics}
                  onSwipeRight={handleSwipeRightWithHaptics}
                  onSwipeComplete={handleSwipeComplete}
                />
              )).slice(0, 3).reverse() // Only render top 3 cards for performance
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <p className="text-xl text-white/70">No more designs to show!</p>
                <Button 
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-white to-white/90 text-black rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
                  onClick={() => {
                    const newItems = generateMoreItems(20, contentType, selectedCategory);
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
              {[...Array(5)].map((_, i) => (
                <CarouselItem key={i} className="pl-2 basis-1/3 md:basis-1/3">
                  <div className="flex-shrink-0 rounded-xl overflow-hidden border border-white/10 animate-fade-in">
                    <div className="aspect-[2/3] bg-black/60 relative">
                      <img 
                        src={`/assets/fashion/fashion${(i % 14) + 1}.jpg`}
                        alt={`Celebrity outfit ${i+1}`}
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
