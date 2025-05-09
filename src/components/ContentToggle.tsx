
import React from "react";
import { Button } from "@/components/ui/button";

type ContentToggleProps = {
  activeTab: "pictures" | "videos";
  onToggle: (type: "pictures" | "videos") => void;
};

const ContentToggle = ({ activeTab, onToggle }: ContentToggleProps) => {
  return (
    <div className="bg-black/70 backdrop-blur-lg p-1.5 rounded-full flex border border-white/30 shadow-lg">
      <Button 
        variant="ghost" 
        size="sm" 
        className={`rounded-full px-6 py-1.5 text-sm font-medium transition-all duration-300 ${
          activeTab === "pictures" 
            ? "bg-white text-black shadow-inner" 
            : "text-white hover:bg-white/20"
        }`}
        onClick={() => onToggle("pictures")}
      >
        Outfits
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`rounded-full px-6 py-1.5 text-sm font-medium transition-all duration-300 ${
          activeTab === "videos" 
            ? "bg-white text-black shadow-inner" 
            : "text-white hover:bg-white/20"
        }`}
        onClick={() => onToggle("videos")}
      >
        GRWM
      </Button>
    </div>
  );
};

export default ContentToggle;
