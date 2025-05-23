import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from "react";
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
  Tag,
  Filter,
  TrendingUp,
  Camera,
  Upload,
  Zap,
  Shuffle,
  Star,
  Search,
  Settings,
  X,
  RefreshCw,
  AlertCircle
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
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Fashion image URLs - using placeholder generators
const fashionImagePlaceholders = Array.from({ length: 20 }, (_, i) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#82E0AA', '#F8C471'];
  const styles = ['Casual', 'Formal', 'Street', 'Chic', 'Boho', 'Vintage', 'Modern', 'Classic', 'Trendy', 'Elegant'];
  const color = colors[i % colors.length];
  const style = styles[i % styles.length];
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='200' y='280' text-anchor='middle' fill='white' font-size='32' font-family='Inter, sans-serif' font-weight='bold'%3E${style}%3C/text%3E%3Ctext x='200' y='320' text-anchor='middle' fill='white' font-size='18' font-family='Inter, sans-serif'%3EFashion %23${i + 1}%3C/text%3E%3C/svg%3E`;
});

// Video thumbnails for GRWM content
const grwmImages = Array.from({ length: 15 }, (_, i) => {
  const colors = ['#E74C3C', '#9B59B6', '#3498DB', '#1ABC9C', '#F39C12', '#27AE60', '#E67E22', '#34495E'];
  const themes = ['GRWM', 'Outfit', 'Style', 'Look', 'Fashion', 'Trend', 'Vibe', 'Mood'];
  const color = colors[i % colors.length];
  const theme = themes[i % themes.length];
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='${encodeURIComponent(color)}'/%3E%3Ccircle cx='200' cy='200' r='40' fill='white' opacity='0.8'/%3E%3Cpolygon points='185,180 185,220 220,200' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='200' y='340' text-anchor='middle' fill='white' font-size='28' font-family='Inter, sans-serif' font-weight='bold'%3E${theme} Video%3C/text%3E%3Ctext x='200' y='380' text-anchor='middle' fill='white' font-size='16' font-family='Inter, sans-serif'%3EClick to play%3C/text%3E%3C/svg%3E`;
});

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

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('SwipeStyle Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-900 to-gray-900 p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h1>
            <p className="text-white/70 mb-6">We're working to fix this issue</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 hover:bg-red-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh App
            </Button>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Enhanced loading component
const LoadingScreen = ({ contentType }: { contentType: string }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            delay: i * 0.1,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
    
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto mb-6"
        >
          <Sparkles className="w-full h-full text-white" />
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold text-white text-center mb-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Your Style Feed
        </motion.h1>
        
        <motion.div 
          className="w-64 h-2 bg-white/20 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        
        <p className="text-white/70 text-center mt-4">
          Curating {contentType} just for you...
        </p>
      </div>
    </motion.div>
  </div>
);

const Home = () => {
  const [currentItems, setCurrentItems] = useState<FeedItem[]>([]);
  const [savedItems, setSavedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contentType, setContentType] = useState<"pictures" | "videos">("pictures");
  const [showAIMenu, setShowAIMenu] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
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
  
  const swipeAreaRef = useRef<HTMLDivElement>(null);
  const [swipeStats, setSwipeStats] = useState({ likes: 0, passes: 0 });
  const [streakCount, setStreakCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  // Performance optimization: Memoize heavy calculations
  const filterImagesByCategory = useCallback((images: string[], category: string) => {
    if (category === "All") return images;
    const keywords = categoryKeywords[category] || [];
    return images.filter(url =>
      keywords.some(kw => url.toLowerCase().includes(kw))
    );
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Back online! 🌐');
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.error('You\'re offline. Some features may not work.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update localStorage when uploadedImages changes
  useEffect(() => {
    try {
      localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));
    } catch (error) {
      console.warn('Failed to save uploaded images to localStorage:', error);
    }
  }, [uploadedImages]);

  // Add uploaded images to the image pool
  const getImageSource = useCallback((type: "pictures" | "videos", category: string) => {
    let base = type === "pictures" ? fashionImagePlaceholders : grwmImages;
    if (uploadedImages.length > 0 && (category === 'All' || category === 'User Uploads')) {
      base = [...uploadedImages, ...base];
    }
    return filterImagesByCategory(base, category);
  }, [uploadedImages, filterImagesByCategory]);

  // Enhanced generateMoreItems with error handling
  const generateMoreItems = useCallback((count: number, type: "pictures" | "videos" = "pictures", category: string = selectedCategory): FeedItem[] => {
    try {
      const items: FeedItem[] = [];
      let imageSource = getImageSource(type, category);
      if (imageSource.length === 0) imageSource = getImageSource(type, 'All');
      
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * feedItems.length);
        const originalItem = feedItems[randomIndex];
        const randomImageIndex = Math.floor(Math.random() * imageSource.length);
        
        const newItem: FeedItem = {
          ...JSON.parse(JSON.stringify(originalItem)),
          id: `${originalItem.id}-${i}-${Date.now() + Math.random()}`,
          isVideo: type === "videos",
          aiRecommended: Math.random() > 0.7, // 30% chance of AI recommendation
          shoppingOptions: {
            buy: true,
            thrift: Math.random() > 0.3,
            rent: Math.random() > 0.6
          }
        };

        if ("images" in newItem) {
          newItem.images = [imageSource[randomImageIndex]];
        } else if (newItem.items && newItem.items.length > 0) {
          newItem.items[0].image = imageSource[randomImageIndex];
        }

        if (type === "videos") {
          const prefixes = ["GRWM:", "Get Ready With Me:", "Styling:", "My Look:", "Outfit of the Day:"];
          const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
          newItem.title = `${randomPrefix} ${newItem.title}`;
        }
        
        items.push(newItem);
      }
      
      return items;
    } catch (error) {
      console.error('Error generating items:', error);
      setError('Failed to load content. Please try again.');
      return [];
    }
  }, [selectedCategory, getImageSource]);

  // Initial content loading with error handling
  useEffect(() => {
    const loadInitialContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate network delay for realistic experience
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const items = generateMoreItems(20, contentType, selectedCategory);
        if (items.length === 0) {
          throw new Error('No content available');
        }
        
        setCurrentItems(items);
      } catch (error) {
        console.error('Failed to load initial content:', error);
        setError('Failed to load content. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialContent();
  }, [contentType, selectedCategory, generateMoreItems]);

  // Enhanced onboarding toast with better UX
  useEffect(() => {
    if (!loading && currentItems.length > 0) {
      const timer = setTimeout(() => {
        toast.success('Welcome to SwipeStyle! 🎉', {
          description: isMobile 
            ? 'Swipe right to like, left to pass. Tap the AI button for recommendations!' 
            : 'Use arrow keys or drag to swipe. Press Enter to view details.',
          duration: 5000,
        });
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [loading, currentItems.length, isMobile]);

  // Auto-generate more content when running low with error handling
  useEffect(() => {
    if (currentItems.length <= 3 && !loading && !error) {
      try {
        const newItems = generateMoreItems(15, contentType, selectedCategory);
        setCurrentItems(prev => [...prev, ...newItems]);
      } catch (error) {
        console.error('Failed to generate more items:', error);
        toast.error('Failed to load more content');
      }
    }
  }, [currentItems.length, loading, error, contentType, selectedCategory, generateMoreItems]);

  const getRandomCategory = useCallback(() => {
    const weightedCategories = [
      ...likedCategories,
      ...likedCategories, // Double weight for liked categories
      ...categories.filter(cat => !likedCategories.includes(cat))
    ];
    return weightedCategories[Math.floor(Math.random() * weightedCategories.length)];
  }, [likedCategories]);

  const handleSwipeRight = useCallback((item: FeedItem) => {
    setSavedItems(prev => [item, ...prev]);
    setSwipeStats(prev => ({ ...prev, likes: prev.likes + 1 }));
    setStreakCount(prev => prev + 1);
    
    // Learn from user preferences
    const category = getRandomCategory();
    if (!likedCategories.includes(category) && Math.random() > 0.7) {
      setLikedCategories(prev => {
        const updated = [...prev, category];
        try {
          localStorage.setItem('likedCategories', JSON.stringify(updated));
        } catch (error) {
          console.warn('Failed to save preferences:', error);
        }
        return updated;
      });
    }
    
    toast.success('Added to your style collection! ❤️', {
      description: `Streak: ${streakCount + 1} items`,
      duration: 2000,
    });
  }, [likedCategories, getRandomCategory, streakCount]);

  const handleSwipeLeft = useCallback((item: FeedItem) => {
    setSwipeStats(prev => ({ ...prev, passes: prev.passes + 1 }));
    setStreakCount(0); // Reset streak on pass
  }, []);

  const handleSwipeComplete = useCallback(() => {
    try {
      if (currentItems.length <= 5) {
        const moreItems = generateMoreItems(10, contentType, selectedCategory);
        setCurrentItems(prev => [...prev.slice(1), ...moreItems]);
      } else {
        setCurrentItems(prev => prev.slice(1));
      }
    } catch (error) {
      console.error('Error completing swipe:', error);
      setCurrentItems(prev => prev.slice(1));
    }
  }, [currentItems.length, generateMoreItems, contentType, selectedCategory]);

  const handleAIOutfit = useCallback((occasion: string) => {
    setShowAIMenu(false);
    toast.info(`Generating ${occasion} outfit...`, {
      description: 'Our AI is creating perfect looks for you!',
      duration: 3000,
    });
    
    // Simulate AI generation with error handling
    setTimeout(() => {
      try {
        const aiItems = generateMoreItems(5, "pictures", "All").map(item => ({
          ...item,
          aiRecommended: true,
          title: `AI Generated: ${occasion} Look - ${item.title}`
        }));
        
        setCurrentItems(prev => [...aiItems, ...prev]);
        toast.success('AI outfit ready! ✨', {
          description: 'Swipe through your personalized recommendations',
        });
      } catch (error) {
        console.error('AI generation failed:', error);
        toast.error('Failed to generate AI outfits. Please try again.');
      }
    }, 2000);
  }, [generateMoreItems]);

  const handleContentToggle = useCallback((type: "pictures" | "videos") => {
    if (type !== contentType) {
      setLoading(true);
      setContentType(type);
      setError(null);
      
      toast.info(`Switching to ${type}...`, {
        description: 'Loading fresh content for you',
        duration: 2000,
      });
    }
  }, [contentType]);

  // Enhanced category selection
  const handleCategorySelect = useCallback((category: string) => {
    if (category !== selectedCategory) {
      setSelectedCategory(category);
      setLoading(true);
      setShowCategoryFilter(false);
      setError(null);
      
      toast.info(`Filtering by ${category}...`, {
        description: 'Finding styles that match your vibe',
        duration: 2000,
      });
    }
  }, [selectedCategory]);

  const handleAIGenerate = useCallback(() => {
    setShowAIMenu(!showAIMenu);
  }, [showAIMenu]);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image too large. Please choose a file under 5MB.');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imageUrl = e.target?.result as string;
          setUploadedImages(prev => [imageUrl, ...prev.slice(0, 9)]); // Limit to 10 uploaded images
          toast.success('Image uploaded! 📸', {
            description: 'Your photo has been added to the style feed',
          });
        } catch (error) {
          console.error('Upload failed:', error);
          toast.error('Failed to upload image. Please try again.');
        }
      };
      reader.onerror = () => {
        toast.error('Failed to read image file.');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Error state
  if (error && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-900 to-gray-900 p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Something went wrong</h1>
          <p className="text-white/70 mb-6">{error}</p>
          
          {!isOnline && (
            <Alert className="mb-6 bg-orange-900/50 border-orange-500">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-orange-200">
                You appear to be offline. Please check your internet connection.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 hover:bg-red-700"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button 
              onClick={() => setError(null)} 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Try Again
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return <LoadingScreen contentType={contentType} />;
  }

  if (currentItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <Shuffle className="w-24 h-24 text-white/50 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">No more items!</h1>
          <p className="text-white/70 mb-6">Check back later for fresh styles</p>
          
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Shuffle className="w-4 h-4 mr-2" />
            Refresh Feed
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div 
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
        role="main"
        aria-label="SwipeStyle Fashion Discovery App"
      >
        {/* Enhanced background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #purple 2px, transparent 2px), radial-gradient(circle at 75% 75%, #pink 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Enhanced header with accessibility */}
        <motion.header 
          className="relative z-20 p-6 flex justify-between items-center backdrop-blur-md bg-black/20 border-b border-white/10"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          role="banner"
        >
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
              <SwipeStyleLogo />
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              aria-label={`${swipeStats.likes} items liked`}
            >
              <TrendingUp className="w-4 h-4 text-green-400" aria-hidden="true" />
              <span className="text-white font-semibold">{swipeStats.likes}</span>
              <span className="text-white/60">likes</span>
            </motion.div>
            
            {!isOnline && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-orange-500/20 px-3 py-2 rounded-full border border-orange-500/30"
              >
                <AlertCircle className="w-4 h-4 text-orange-400" />
                <span className="text-orange-200 text-sm">Offline</span>
              </motion.div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Category filter */}
            <DropdownMenu open={showCategoryFilter} onOpenChange={setShowCategoryFilter}>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-purple-500"
                    aria-label={`Filter by category: ${selectedCategory}`}
                  >
                    <Filter className="w-4 h-4 mr-2" aria-hidden="true" />
                    {selectedCategory}
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/90 backdrop-blur-md border-white/20">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="text-white hover:bg-white/10"
                  >
                    {category}
                    {likedCategories.includes(category) && (
                      <Star className="w-4 h-4 ml-auto text-yellow-400" aria-label="Favorite category" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Upload button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-purple-500"
                onClick={() => document.getElementById('image-upload')?.click()}
                aria-label="Upload your own image"
              >
                <Upload className="w-4 h-4" aria-hidden="true" />
              </Button>
            </motion.div>
            
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              aria-label="Choose image file to upload"
            />
          </div>
        </motion.header>

        {/* Content type toggle */}
        <motion.div 
          className="relative z-20 flex justify-center py-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <ContentToggle contentType={contentType} onToggle={handleContentToggle} />
        </motion.div>

        {/* Enhanced swipe area with accessibility */}
        <div className="relative z-10 px-6 pb-32" ref={swipeAreaRef}>
          <motion.div 
            className="max-w-sm mx-auto h-[70vh] relative focus-within:ring-4 focus-within:ring-purple-500/50 rounded-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            role="region"
            aria-label="Fashion items to swipe through"
            aria-live="polite"
          >
            <Suspense fallback={<div>Loading cards...</div>}>
              <AnimatePresence mode="popLayout">
                {currentItems.slice(0, 3).map((item, index) => (
                  <SwipeCard
                    key={item.id}
                    item={item}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                    onSwipeComplete={handleSwipeComplete}
                    indexInStack={index}
                  />
                ))}
              </AnimatePresence>
            </Suspense>
          </motion.div>
        </div>

        {/* Enhanced action buttons with accessibility */}
        <motion.div 
          className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          role="group"
          aria-label="Swipe actions"
        >
          {/* Pass button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => currentItems.length > 0 && handleSwipeLeft(currentItems[0])}
            className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl hover:bg-red-500/30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/50"
            aria-label="Pass on this item (swipe left)"
            disabled={currentItems.length === 0}
          >
            <X className="w-8 h-8 text-white" aria-hidden="true" />
          </motion.button>
          
          {/* AI button */}
          <DropdownMenu open={showAIMenu} onOpenChange={setShowAIMenu}>
            <DropdownMenuTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20 hover:shadow-purple-500/25 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
                aria-label="Get AI outfit recommendations"
              >
                <Sparkles className="w-10 h-10 text-white" aria-hidden="true" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black/90 backdrop-blur-md border-white/20 mb-4">
              <DropdownMenuItem 
                onClick={() => handleAIOutfit("Casual")}
                className="text-white hover:bg-white/10"
              >
                <Tag className="w-4 h-4 mr-2" aria-hidden="true" />
                Casual Look
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAIOutfit("Formal")}
                className="text-white hover:bg-white/10"
              >
                <Star className="w-4 h-4 mr-2" aria-hidden="true" />
                Formal Outfit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleAIOutfit("Party")}
                className="text-white hover:bg-white/10"
              >
                <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                Party Style
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Like button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => currentItems.length > 0 && handleSwipeRight(currentItems[0])}
            className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl hover:bg-green-500/30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/50"
            aria-label="Like this item (swipe right)"
            disabled={currentItems.length === 0}
          >
            <Heart className="w-8 h-8 text-white" aria-hidden="true" />
          </motion.button>
        </motion.div>

        {/* Enhanced stats overlay */}
        <AnimatePresence>
          {streakCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed top-32 right-6 z-30"
              role="status"
              aria-label={`Current streak: ${streakCount} items`}
            >
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-lg font-bold shadow-xl">
                🔥 {streakCount} streak!
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard shortcut hint for desktop */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="fixed bottom-4 left-4 z-20 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white/70 text-sm"
          >
            <p className="mb-1">Keyboard shortcuts:</p>
            <div className="flex gap-4 text-xs">
              <span>← Pass</span>
              <span>→ Like</span>
              <span>Enter Details</span>
            </div>
          </motion.div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(Home);