
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, X, ThumbsUp, Sparkles } from "lucide-react";
import { Design, Outfit, FeedItem } from "@/types";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";

type SwipeCardProps = {
  item: FeedItem;
  onSwipeLeft: (item: FeedItem) => void;
  onSwipeRight: (item: FeedItem) => void;
  onSwipeComplete: () => void;
};

const SwipeCard = ({ item, onSwipeLeft, onSwipeRight, onSwipeComplete }: SwipeCardProps) => {
  const [exitX, setExitX] = useState(0);
  const controls = useAnimation();
  const dragConstraints = useRef(null);

  // Check if the item is a Design or an Outfit
  const isDesign = "images" in item;
  const image = isDesign ? item.images[0] : item.items[0].image;
  const title = item.title;
  const creator = item.creator;
  const likes = item.likes;
  const price = isDesign ? item.price : item.items.reduce((sum, item) => sum + item.price, 0);
  const detailPath = isDesign ? `/designs/${item.id}` : `/outfits/${item.id}`;

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      setExitX(200);
      onSwipeRight(item);
      controls.start({ x: 200, opacity: 0, transition: { duration: 0.5 } }).then(onSwipeComplete);
    } else if (info.offset.x < -threshold) {
      setExitX(-200);
      onSwipeLeft(item);
      controls.start({ x: -200, opacity: 0, transition: { duration: 0.5 } }).then(onSwipeComplete);
    } else {
      controls.start({ x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  // Calculate rotation based on drag distance
  const getRotation = (x: number) => {
    return x * 0.1; // Adjust multiplier for more or less rotation effect
  };

  return (
    <motion.div
      className="swipe-card absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden shadow-xl cursor-grab active:cursor-grabbing"
      drag="x"
      dragConstraints={dragConstraints}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ scale: 0.95, opacity: 0 }}
      exit={{ x: exitX, opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformOrigin: "center center" }}
      whileDrag={{ scale: 1.02 }}
      dragTransition={{
        power: 0.2,
        timeConstant: 200,
        modifyTarget: (target) => getRotation(target)
      }}
      ref={dragConstraints}
    >
      {/* Background Image with enhanced overlay */}
      <div className="w-full h-full relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        
        {/* Enhanced gradient overlay with animated border */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0 animate-pulse"></div>
        </div>
        
        {/* Content with improved styling */}
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          {isDesign ? (
            <div className="inline-block px-3 py-1 bg-white text-black rounded-full text-xs font-medium mb-2 shadow-lg">
              Design
            </div>
          ) : (
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium mb-2 shadow-lg border border-white/30">
              Outfit
            </div>
          )}
          
          <h2 className="text-3xl font-bold mb-2 drop-shadow-md">{title}</h2>
          
          <div className="flex items-center justify-between mb-3 backdrop-blur-sm bg-black/30 p-2 rounded-lg">
            <Link to={`/creator/${creator.id}`} className="flex items-center gap-2">
              <img 
                src={creator.avatar} 
                alt={creator.displayName} 
                className="w-8 h-8 rounded-full object-cover border border-white/30"
              />
              <span className="font-medium">{creator.displayName}</span>
              {creator.isVerified && (
                <span className="bg-white text-black rounded-full p-0.5 w-4 h-4 flex items-center justify-center text-[10px]">✓</span>
              )}
            </Link>
            <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
              <Heart className="w-4 h-4 text-white" />
              <span className="text-sm">{likes.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4 backdrop-blur-sm bg-black/40 p-3 rounded-lg">
            <span className="text-xl font-bold bg-white/10 px-3 py-1 rounded-full">${price.toFixed(2)}</span>
            <Link to={detailPath} className="bg-white text-black font-semibold py-2 px-6 rounded-full hover:bg-white/90 transition-colors shadow-lg">
              View Details
            </Link>
          </div>
        </div>

        {/* Enhanced swipe indicators */}
        <div className="absolute top-1/2 -translate-y-1/2 left-6 bg-black/50 backdrop-blur-md p-4 rounded-full opacity-0 transition-opacity duration-300 border border-white/20 shadow-xl" id="swipe-left">
          <X className="w-8 h-8 text-white" />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-6 bg-black/50 backdrop-blur-md p-4 rounded-full opacity-0 transition-opacity duration-300 border border-white/20 shadow-xl" id="swipe-right">
          <Heart className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Action buttons - shown on desktop with enhanced styling */}
      <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 flex gap-4 hidden md:flex">
        <Button 
          variant="outline"
          size="icon" 
          className="rounded-full w-16 h-16 bg-black/40 backdrop-blur-md border-white/30 text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
          onClick={() => {
            setExitX(-200);
            controls.start({ x: -200, opacity: 0, rotate: -30, transition: { duration: 0.5 } }).then(onSwipeComplete);
            onSwipeLeft(item);
          }}
        >
          <X className="w-7 h-7" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-16 h-16 bg-black/40 backdrop-blur-md border-white/30 text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
          onClick={() => {
            setExitX(200);
            controls.start({ x: 200, opacity: 0, rotate: 30, transition: { duration: 0.5 } }).then(onSwipeComplete);
            onSwipeRight(item);
          }}
        >
          <Heart className="w-7 h-7 text-white" />
        </Button>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
