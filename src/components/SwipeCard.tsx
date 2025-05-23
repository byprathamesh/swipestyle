import React, { useState, useCallback, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { Heart, X, Eye, Star, ShoppingBag, Recycle, Tag } from "lucide-react";
import { Design, Outfit, FeedItem } from "@/types";
import { motion, PanInfo } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type SwipeCardProps = {
  item: FeedItem;
  onSwipeLeft: (item: FeedItem) => void;
  onSwipeRight: (item: FeedItem) => void;
  onSwipeComplete: () => void;
  indexInStack: number;
};

// Enhanced haptic feedback with better performance
const triggerHapticFeedback = (() => {
  let lastVibration = 0;
  return (type: 'light' | 'medium' | 'heavy' = 'medium') => {
    const now = Date.now();
    if (now - lastVibration < 50) return; // Throttle vibrations
    lastVibration = now;
    
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30, 10, 30]
      };
      navigator.vibrate(patterns[type]);
    }
  };
})();

// Safe number formatting function
const formatPrice = (price: number | null | undefined): string => {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0';
  }
  return price.toFixed(2);
};

// Safe number formatting for likes
const formatLikes = (likes: number | null | undefined): string => {
  if (typeof likes !== 'number' || isNaN(likes)) {
    return '0';
  }
  return likes.toLocaleString();
};

// Placeholder images as data URLs
const PLACEHOLDER_FASHION = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23000'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='white' font-size='24' font-family='Inter, sans-serif'%3EFashion Item%3C/text%3E%3C/svg%3E";
const PLACEHOLDER_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23333'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='white' font-size='24' font-family='Inter, sans-serif'%3E👤%3C/text%3E%3C/svg%3E";

const SwipeCard = React.memo(({ item, onSwipeLeft, onSwipeRight, onSwipeComplete, indexInStack }: SwipeCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hasTriggeredFeedback, setHasTriggeredFeedback] = useState(false);
  
  const isTopCard = indexInStack === 0;

  // Memoized calculations for better performance
  const stackOffset = useMemo(() => indexInStack * 8, [indexInStack]);
  const stackScale = useMemo(() => 1 - indexInStack * 0.05, [indexInStack]);
  const stackOpacity = useMemo(() => Math.max(0.3, 1 - indexInStack * 0.25), [indexInStack]);

  // Memoized data extraction for performance with safe fallbacks
  const cardData = useMemo(() => {
    try {
      const isDesign = "images" in item && Array.isArray(item.images);
      const image = isDesign 
        ? (item.images?.[0] || PLACEHOLDER_FASHION)
        : ((item as Outfit).items?.[0]?.image || PLACEHOLDER_FASHION);
      
      const title = item.title || 'Stylish Look';
      const creator = item.creator || { displayName: 'Anonymous', avatar: PLACEHOLDER_AVATAR };
      const likes = item.likes || 0;
      
      // Safe price calculation
      let price = 0;
      if (isDesign) {
        price = typeof (item as Design).price === 'number' ? (item as Design).price : 0;
      } else {
        price = (item as Outfit).items?.reduce((sum, item) => {
          const itemPrice = typeof item.price === 'number' ? item.price : 0;
          return sum + itemPrice;
        }, 0) || 0;
      }
      
      const detailPath = isDesign ? `/designs/${item.id}` : `/outfits/${item.id}`;
      
      return { isDesign, image, title, creator, likes, price, detailPath };
    } catch (error) {
      console.error('Error processing card data:', error);
      return {
        isDesign: true,
        image: PLACEHOLDER_FASHION,
        title: 'Stylish Look',
        creator: { displayName: 'Anonymous', avatar: PLACEHOLDER_AVATAR },
        likes: 0,
        price: 0,
        detailPath: `/designs/${item.id}`
      };
    }
  }, [item]);

  const shoppingOptions = useMemo(() => item.shoppingOptions || {
    buy: true,
    thrift: Math.random() > 0.3,
    rent: Math.random() > 0.6,
  }, [item.shoppingOptions]);

  // Enhanced drag handling
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setHasTriggeredFeedback(false);
    triggerHapticFeedback('light');
  }, []);

  const handleDrag = useCallback((_: any, info: PanInfo) => {
    const threshold = 100;
    const currentX = info.offset.x;
    setDragOffset(info.offset);
    
    // Trigger haptic feedback at threshold
    if (Math.abs(currentX) > threshold && !hasTriggeredFeedback) {
      triggerHapticFeedback('medium');
      setHasTriggeredFeedback(true);
    }
    
    // Reset feedback flag when back in center
    if (Math.abs(currentX) < threshold / 2) {
      setHasTriggeredFeedback(false);
    }
  }, [hasTriggeredFeedback]);

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    
    const threshold = 120;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    // Enhanced decision logic with velocity consideration
    const shouldSwipeRight = offset > threshold || (velocity > 500 && offset > 50);
    const shouldSwipeLeft = offset < -threshold || (velocity < -500 && offset < -50);
    
    if (shouldSwipeRight) {
      triggerHapticFeedback('heavy');
      onSwipeRight(item);
      onSwipeComplete();
    } else if (shouldSwipeLeft) {
      triggerHapticFeedback('heavy');
      onSwipeLeft(item);
      onSwipeComplete();
    } else {
      triggerHapticFeedback('light');
    }
  }, [item, onSwipeLeft, onSwipeRight, onSwipeComplete]);

  // Keyboard accessibility
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isTopCard) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        onSwipeLeft(item);
        onSwipeComplete();
        break;
      case 'ArrowRight':
        event.preventDefault();
        onSwipeRight(item);
        onSwipeComplete();
        break;
      case 'Enter':
        event.preventDefault();
        window.location.href = cardData.detailPath;
        break;
    }
  }, [isTopCard, item, onSwipeLeft, onSwipeRight, onSwipeComplete, cardData.detailPath]);

  const getSwipeIndicatorOpacity = () => {
    if (Math.abs(dragOffset.x) > 50) {
      return dragOffset.x > 0 ? 'bg-white/20' : 'bg-gray-900/40';
    }
    return 'bg-transparent';
  };

  return (
    <motion.div
      className={`absolute w-full h-full ${isTopCard ? 'z-30' : `z-${20 - indexInStack}`}`}
      initial={{
        opacity: stackOpacity,
        scale: stackScale,
        y: stackOffset,
        x: 0,
        rotate: 0,
      }}
      animate={{
        opacity: isTopCard ? 1 : stackOpacity,
        scale: isTopCard ? 1 : stackScale,
        y: stackOffset,
        x: 0,
        rotate: 0,
      }}
      exit={{
        x: dragOffset.x > 0 ? 400 : -400,
        y: -100,
        opacity: 0,
        rotate: dragOffset.x > 0 ? 25 : -25,
        scale: 0.8,
      }}
      drag={isTopCard ? "x" : false}
      dragConstraints={{ left: -300, right: 300 }}
      dragElastic={0.2}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onKeyDown={handleKeyDown}
      tabIndex={isTopCard ? 0 : -1}
      role="button"
      aria-label={`Fashion item: ${cardData.title} by ${cardData.creator.displayName}. Press arrow keys to swipe, Enter to view details.`}
      whileHover={{ scale: isTopCard ? 1.02 : stackScale }}
      whileTap={{ scale: isTopCard ? 0.98 : stackScale }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={cardData.image}
            alt={cardData.title}
            className="w-full h-full object-cover"
            loading={isTopCard ? "eager" : "lazy"}
            style={{
              filter: isDragging ? "blur(1px)" : "blur(0px)",
            }}
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER_FASHION;
            }}
          />
          
          {/* Overlay - Instagram style gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        </div>

        {/* Swipe Indicators */}
        <div className={`absolute inset-0 ${getSwipeIndicatorOpacity()} transition-all duration-200`} />

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden bg-gray-900/50 backdrop-blur-sm">
                <img
                  src={cardData.creator.avatar}
                  alt={cardData.creator.displayName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER_AVATAR;
                  }}
                />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{cardData.creator.displayName}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-white fill-current" />
                  <span className="text-gray-300 text-xs">4.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          {/* Title and Price */}
          <div className="mb-4">
            <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">
              {cardData.title}
            </h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-bold text-white">
                ${formatPrice(cardData.price)}
              </span>
              <div className="flex items-center gap-1 text-gray-300">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{formatLikes(cardData.likes)}</span>
              </div>
            </div>
          </div>

          {/* Shopping Options */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {shoppingOptions.buy && (
              <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                <ShoppingBag className="w-3 h-3 mr-1" />
                Buy
              </Badge>
            )}
            {shoppingOptions.thrift && (
              <Badge variant="secondary" className="bg-gray-800/60 text-gray-200 border-gray-600/30 backdrop-blur-sm">
                <Recycle className="w-3 h-3 mr-1" />
                Thrift
              </Badge>
            )}
            {shoppingOptions.rent && (
              <Badge variant="secondary" className="bg-gray-700/60 text-gray-200 border-gray-500/30 backdrop-blur-sm">
                <Tag className="w-3 h-3 mr-1" />
                Rent
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full bg-gray-900/60 border-gray-600/40 text-white hover:bg-gray-800/80 backdrop-blur-sm transition-all duration-200"
              onClick={() => {
                onSwipeLeft(item);
                onSwipeComplete();
              }}
              aria-label="Pass on this item"
            >
              <X className="w-5 h-5" />
            </Button>
            
            <Link to={cardData.detailPath}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
                aria-label="View item details"
              >
                <Eye className="w-5 h-5" />
              </Button>
            </Link>
            
            <Button
              size="lg"
              variant="outline"
              className="rounded-full bg-white/90 border-white text-black hover:bg-white hover:text-black backdrop-blur-sm transition-all duration-200"
              onClick={() => {
                onSwipeRight(item);
                onSwipeComplete();
              }}
              aria-label="Like this item"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Focus outline for accessibility */}
        <div className="absolute inset-0 rounded-3xl ring-2 ring-white ring-opacity-0 focus-within:ring-opacity-50 transition-all duration-200 pointer-events-none" />
      </div>
    </motion.div>
  );
});

SwipeCard.displayName = "SwipeCard";

export default SwipeCard; 