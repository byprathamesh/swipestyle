
import React from "react";
import { Button } from "@/components/ui/button";

type ContentToggleProps = {
  activeTab: "pictures" | "videos";
  onToggle: (type: "pictures" | "videos") => void;
};

const ContentToggle = ({ activeTab, onToggle }: ContentToggleProps) => {
  return (
    <div className="bg-black/40 backdrop-blur-md p-1 rounded-full flex border border-white/20 shadow-lg">
      <Button 
        variant="ghost" 
        size="sm" 
        className={`rounded-full px-6 py-1.5 text-sm font-medium transition-all duration-300 ${
          activeTab === "pictures" 
            ? "bg-white text-black shadow-inner" 
            : "text-white hover:bg-white/10"
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
            : "text-white hover:bg-white/10"
        }`}
        onClick={() => onToggle("videos")}
      >
        GRWM
      </Button>
    </div>
  );
};

export default ContentToggle;
