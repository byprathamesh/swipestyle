
import React from "react";
import { Button } from "@/components/ui/button";

type ContentToggleProps = {
  activeTab: "pictures" | "videos";
  onToggle: (type: "pictures" | "videos") => void;
};

const ContentToggle = ({ activeTab, onToggle }: ContentToggleProps) => {
  return (
    <div className="bg-white/10 p-1 rounded-full flex border border-white/20 backdrop-blur-sm">
      <Button 
        variant="ghost" 
        size="sm" 
        className={`rounded-full px-4 text-xs font-medium ${
          activeTab === "pictures" 
            ? "bg-white text-black" 
            : "text-white hover:bg-white/10"
        }`}
        onClick={() => onToggle("pictures")}
      >
        Outfits
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`rounded-full px-4 text-xs font-medium ${
          activeTab === "videos" 
            ? "bg-white text-black" 
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
