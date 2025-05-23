import React, { useState, useRef, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Heart, X, ThumbsUp, Sparkles, Tag, ShoppingBag, Recycle, Star, Zap, TrendingUp, Eye } from "lucide-react";
import { Design, Outfit, FeedItem } from "@/types";
import { motion, PanInfo, useAnimation, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type SwipeCardProps = {
  item: FeedItem;
  onSwipeLeft: (item: FeedItem) => void;
  onSwipeRight: (item: FeedItem) => void;
  onSwipeComplete: () => void;
  indexInStack: number;
};

// Enhanced haptic feedback
const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'medium') => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: [10],
      medium: [20],
      heavy: [30, 10, 30]
    };
    navigator.vibrate(patterns[type]);
  }
};

const SwipeCard = ({ item, onSwipeLeft, onSwipeRight, onSwipeComplete, indexInStack }: SwipeCardProps) => {
  const [exitX, setExitX] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasTriggeredFeedback, setHasTriggeredFeedback] = useState(false);
  const controls = useAnimation();
  const dragConstraints = useRef(null);
  
  // Enhanced motion values with spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  
  // More sophisticated transform values
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 0.5, 1, 0.5, 0]);
  const scale = useTransform(x, [-300, 0, 300], [0.8, 1, 0.8]);
  const blur = useTransform(x, [-150, 0, 150], [2, 0, 2]);
  
  // Enhanced background parallax
  const backgroundScale = useTransform(x, [-300, 0, 300], [1.2, 1, 1.2]);
  const backgroundX = useTransform(x, [-300, 0, 300], [-50, 0, 50]);

  const isTopCard = indexInStack === 0;

  // Memoized calculations for better performance
  const stackOffset = useMemo(() => indexInStack * 8, [indexInStack]);
  const stackScale = useMemo(() => 1 - indexInStack * 0.05, [indexInStack]);
  const stackOpacity = useMemo(() => Math.max(0.3, 1 - indexInStack * 0.25), [indexInStack]);

  // Enhanced initial animation
  const initialAnimState = useMemo(() => ({
    opacity: isTopCard ? 0 : stackOpacity,
    scale: isTopCard ? 0.9 : stackScale,
    y: stackOffset,
    x: 0,
    rotate: 0,
  }), [isTopCard, stackOpacity, stackScale, stackOffset]);

  React.useEffect(() => {
    const targetOpacity = isTopCard ? 1 : stackOpacity;
    const targetScale = isTopCard ? 1 : stackScale;
    const targetY = stackOffset;

    controls.start({
      opacity: targetOpacity,
      scale: targetScale,
      y: targetY,
      x: 0,
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 30, 
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    });
  }, [controls, item, indexInStack, isTopCard, stackOpacity, stackScale, stackOffset]);

  // Memoized data extraction for performance
  const cardData = useMemo(() => {
    const isDesign = "images" in item;
    const image = isDesign ? item.images[0] : item.items[0].image;
    const title = item.title;
    const creator = item.creator;
    const likes = item.likes;
    const price = isDesign ? item.price : item.items.reduce((sum, item) => sum + item.price, 0);
    const detailPath = isDesign ? `/designs/${item.id}` : `/outfits/${item.id}`;
    
    return { isDesign, image, title, creator, likes, price, detailPath };
  }, [item]);

  const shoppingOptions = useMemo(() => item.shoppingOptions || {
    buy: true,
    thrift: Math.random() > 0.3,
    rent: Math.random() > 0.6,
  }, [item.shoppingOptions]);

  // Enhanced drag handling with better physics and feedback
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setHasTriggeredFeedback(false);
    triggerHapticFeedback('light');
  }, []);

  const handleDrag = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    const currentX = info.offset.x;
    
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

  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 120;
    const velocity = info.velocity.x;
    const offset = info.offset.x;
    
    // Enhanced decision logic with velocity consideration
    const shouldSwipeRight = offset > threshold || (velocity > 500 && offset > 50);
    const shouldSwipeLeft = offset < -threshold || (velocity < -500 && offset < -50);
    
    if (shouldSwipeRight) {
      setExitX(400);
      triggerHapticFeedback('heavy');
      onSwipeRight(item);
      controls.start({ 
        x: 400, 
        y: -100, 
        opacity: 0, 
        rotate: 25,
        scale: 0.8,
        transition: { duration: 0.6, ease: "easeOut" } 
      }).then(onSwipeComplete);
    } else if (shouldSwipeLeft) {
      setExitX(-400);
      triggerHapticFeedback('heavy');
      onSwipeLeft(item);
      controls.start({ 
        x: -400, 
        y: -100, 
        opacity: 0, 
        rotate: -25,
        scale: 0.8,
        transition: { duration: 0.6, ease: "easeOut" } 
      }).then(onSwipeComplete);
    } else {
      // Enhanced bounce back with better spring physics
      triggerHapticFeedback('light');
      controls.start({ 
        x: 0, 
        y: 0, 
        opacity: 1, 
        rotate: 0,
        scale: 1,
        transition: { 
          type: "spring", 
          stiffness: 600, 
          damping: 25,
          mass: 0.8
        } 
      });
    }
  }, [item, onSwipeLeft, onSwipeRight, onSwipeComplete, controls]);

  // Enhanced swipe indicator colors with better gradients
  const getSwipeIndicatorColor = useCallback((x: number) => {
    if (x > 50) return "from-emerald-400/30 to-green-600/60";
    if (x < -50) return "from-red-400/30 to-pink-600/60";
    return "from-transparent to-transparent";
  }, []);

  // Keyboard accessibility
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!isTopCard) return;
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        onSwipeLeft(item);
        handleDragEnd(event as any, { offset: { x: -200, y: 0 }, velocity: { x: -600, y: 0 } } as PanInfo);
        break;
      case 'ArrowRight':
        event.preventDefault();
        onSwipeRight(item);
        handleDragEnd(event as any, { offset: { x: 200, y: 0 }, velocity: { x: 600, y: 0 } } as PanInfo);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        // Navigate to detail page
        window.location.href = cardData.detailPath;
        break;
    }
  }, [isTopCard, item, onSwipeLeft, onSwipeRight, handleDragEnd, cardData.detailPath]);

  return (
    <motion.div
      className="swipe-card absolute inset-0 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing group focus:outline-none focus:ring-4 focus:ring-purple-500/50"
      drag={isTopCard ? "x" : false}
      dragConstraints={dragConstraints}
      dragElastic={0.2}
      dragMomentum={true}
      onDragStart={isTopCard ? handleDragStart : undefined}
      onDrag={isTopCard ? handleDrag : undefined}
      onDragEnd={isTopCard ? handleDragEnd : undefined}
      animate={controls}
      initial={initialAnimState}
      exit={{ x: exitX, opacity: 0, scale: 0.8, rotate: exitX > 0 ? 25 : -25 }}
      style={{ 
        x: isTopCard ? springX : 0,
        y: isTopCard ? springY : stackOffset,
        rotate: isTopCard ? rotate : 0,
        opacity: isTopCard ? opacity : stackOpacity,
        scale: isTopCard ? scale : stackScale,
        zIndex: 100 - indexInStack,
        transformOrigin: "center center",
        filter: isTopCard ? `blur(${blur.get()}px)` : 'none'
      }}
      whileHover={isTopCard ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={isTopCard ? { scale: 0.98 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={isTopCard ? 0 : -1}
      role="button"
      aria-label={`Fashion item: ${cardData.title} by ${cardData.creator.displayName}. Press arrow keys to swipe, Enter to view details.`}
      ref={dragConstraints}
    >
      {/* Enhanced background with parallax and performance optimization */}
      <div className="w-full h-full relative overflow-hidden">
        <motion.img 
          src={cardData.image} 
          alt={`${cardData.title} - Fashion item by ${cardData.creator.displayName}`}
          className="w-full h-full object-cover"
          style={{
            scale: isTopCard ? backgroundScale : 1,
            x: isTopCard ? backgroundX : 0
          }}
          loading={indexInStack < 2 ? "eager" : "lazy"}
          decoding="async"
        />
        
        {/* Enhanced swipe indicator overlay with better animations */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-r ${getSwipeIndicatorColor(x.get())}`}
          style={{
            opacity: isTopCard ? useTransform(x, [-150, 0, 150], [0.9, 0, 0.9]) : 0
          }}
        />
        
        {/* Enhanced gradient with more sophisticated animations */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent">
          {/* Improved shimmer effect */}
          <motion.div 
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/80 to-transparent"
            animate={{
              x: ["-200%", "200%"],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: indexInStack * 0.5
            }}
          />
          
          {/* Enhanced floating particles with better performance */}
          {isHovered && isTopCard && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/50 rounded-full"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${20 + (i * 8)}%`,
                  }}
                  animate={{
                    y: [-20, -80],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
            </div>
          )}
          
          {/* Drag indicator */}
          {isDragging && (
            <motion.div
              className="absolute inset-0 border-4 border-white/30 rounded-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
        
        {/* Enhanced badges with better animations and accessibility */}
        <div className="absolute top-6 left-6 flex items-center gap-3" role="group" aria-label="Item categories">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
          >
            {cardData.isDesign ? (
              <Badge className="bg-white/95 text-black py-2 px-4 font-semibold text-sm backdrop-blur-md shadow-lg border border-white/20" aria-label="Design category">
                <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
                Design
              </Badge>
            ) : (
              <Badge className="bg-black/80 text-white py-2 px-4 font-semibold text-sm backdrop-blur-md border border-white/30 shadow-lg" aria-label="Outfit category">
                <Star className="w-4 h-4 mr-2" aria-hidden="true" />
                Outfit
              </Badge>
            )}
          </motion.div>
          
          {item.aiRecommended && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 400 }}
            >
              <Badge className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 text-white py-2 px-4 font-semibold text-sm backdrop-blur-md border border-white/30 shadow-lg" aria-label="AI recommended">
                <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                AI Pick
              </Badge>
            </motion.div>
          )}
          
          {item.isVideo && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 400 }}
            >
              <Badge className="bg-gradient-to-r from-blue-500/90 to-cyan-500/90 text-white py-2 px-4 font-semibold text-sm backdrop-blur-md border border-white/30 shadow-lg" aria-label="Video content">
                <Eye className="w-4 h-4 mr-2" aria-hidden="true" />
                GRWM
              </Badge>
            </motion.div>
          )}
        </div>
        
        {/* Enhanced swipe indicators with better physics */}
        <motion.div 
          className="absolute left-8 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            opacity: useTransform(x, [-150, -50], [1, 0]),
            scale: useTransform(x, [-150, -50], [1.3, 0.8]),
            rotate: useTransform(x, [-150, -50], [-10, 0])
          }}
          aria-hidden="true"
        >
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-full shadow-2xl">
            <X className="w-8 h-8" />
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            opacity: useTransform(x, [50, 150], [0, 1]),
            scale: useTransform(x, [50, 150], [0.8, 1.3]),
            rotate: useTransform(x, [50, 150], [0, 10])
          }}
          aria-hidden="true"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-2xl">
            <Heart className="w-8 h-8" />
          </div>
        </motion.div>
        
        {/* Enhanced content section with better accessibility */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-6 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 drop-shadow-lg"
            whileHover={{ scale: 1.02 }}
          >
            {cardData.title}
          </motion.h2>
          
          {/* Enhanced creator section with better accessibility */}
          <motion.div 
            className="flex items-center justify-between mb-4 backdrop-blur-md bg-black/50 p-4 rounded-2xl border border-white/20 shadow-xl"
            whileHover={{ scale: 1.02 }}
            role="group"
            aria-label="Creator information"
          >
            <Link 
              to={`/creator/${cardData.creator.id}`} 
              className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label={`View ${cardData.creator.displayName}'s profile`}
            >
              <motion.img 
                src={cardData.creator.avatar} 
                alt={`${cardData.creator.displayName}'s avatar`}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/40 shadow-lg"
                whileHover={{ scale: 1.1 }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">{cardData.creator.displayName}</span>
                  {cardData.creator.isVerified && (
                    <motion.span 
                      className="bg-blue-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      aria-label="Verified creator"
                    >
                      ✓
                    </motion.span>
                  )}
                </div>
                <span className="text-white/70 text-sm">Fashion Creator</span>
              </div>
            </Link>
            
            <motion.div 
              className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/30"
              whileHover={{ scale: 1.05 }}
              aria-label={`${cardData.likes.toLocaleString()} likes`}
            >
              <Heart className="w-5 h-5 text-red-400" aria-hidden="true" />
              <span className="font-semibold">{cardData.likes.toLocaleString()}</span>
            </motion.div>
          </motion.div>
          
          {/* Enhanced shopping options with better accessibility */}
          <motion.div 
            className="flex flex-wrap gap-3 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            role="group"
            aria-label="Shopping options"
          >
            {shoppingOptions.buy && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge className="bg-white text-black py-3 px-5 font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50" tabIndex={0} aria-label={`Buy for $${cardData.price.toFixed(2)}`}>
                  <ShoppingBag className="w-4 h-4 mr-2" aria-hidden="true" />
                  Buy ${cardData.price.toFixed(2)}
                </Badge>
              </motion.div>
            )}
            
            {shoppingOptions.thrift && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge className="bg-green-600/90 text-white py-3 px-5 font-bold text-sm backdrop-blur-md border border-white/30 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50" tabIndex={0} aria-label={`Thrift for approximately $${(cardData.price * 0.4).toFixed(2)}`}>
                  <Recycle className="w-4 h-4 mr-2" aria-hidden="true" />
                  Thrift ~${(cardData.price * 0.4).toFixed(2)}
                </Badge>
              </motion.div>
            )}
            
            {shoppingOptions.rent && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Badge className="bg-purple-600/90 text-white py-3 px-5 font-bold text-sm backdrop-blur-md border border-white/30 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50" tabIndex={0} aria-label={`Rent for $${(cardData.price * 0.15).toFixed(2)} per day`}>
                  <Tag className="w-4 h-4 mr-2" aria-hidden="true" />
                  Rent ${(cardData.price * 0.15).toFixed(2)}/day
                </Badge>
              </motion.div>
            )}
          </motion.div>
          
          {/* Enhanced action section */}
          <motion.div 
            className="flex justify-between items-center backdrop-blur-md bg-black/60 p-4 rounded-2xl border border-white/20 shadow-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-6 rounded-full shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(255, 193, 7, 0.4)" }}
              aria-label={`Price: $${cardData.price.toFixed(2)}`}
            >
              <TrendingUp className="w-5 h-5 mr-2 inline" aria-hidden="true" />
              ${cardData.price.toFixed(2)}
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to={cardData.detailPath} 
                className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label={`View details for ${cardData.title}`}
              >
                <Sparkles className="w-5 h-5" aria-hidden="true" />
                View Details
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(SwipeCard);
