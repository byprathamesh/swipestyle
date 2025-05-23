import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Image, Video, Sparkles, Camera } from "lucide-react";

type ContentToggleProps = {
  contentType: "pictures" | "videos";
  onToggle: (type: "pictures" | "videos") => void;
};

const ContentToggle = ({ contentType, onToggle }: ContentToggleProps) => {
  return (
    <motion.div 
      className="relative bg-black/40 backdrop-blur-xl p-1 rounded-2xl border border-white/20 shadow-2xl"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Background slider */}
      <motion.div
        className="absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg"
        animate={{
          x: contentType === "pictures" ? "0%" : "100%"
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30
        }}
      />
      
      <div className="relative flex">
        <motion.button
          onClick={() => onToggle("pictures")}
          className={`relative z-10 flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-300 ${
            contentType === "pictures" 
              ? "text-white" 
              : "text-white/60 hover:text-white/80"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{
              rotate: contentType === "pictures" ? [0, 10, -10, 0] : 0,
              scale: contentType === "pictures" ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Image className="w-4 h-4" />
          </motion.div>
          <span>Outfits</span>
          {contentType === "pictures" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.div>
          )}
        </motion.button>
        
        <motion.button
          onClick={() => onToggle("videos")}
          className={`relative z-10 flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors duration-300 ${
            contentType === "videos" 
              ? "text-white" 
              : "text-white/60 hover:text-white/80"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{
              rotate: contentType === "videos" ? [0, 10, -10, 0] : 0,
              scale: contentType === "videos" ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <Video className="w-4 h-4" />
          </motion.div>
          <span>GRWM</span>
          {contentType === "videos" && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <Camera className="w-3 h-3" />
            </motion.div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ContentToggle;
