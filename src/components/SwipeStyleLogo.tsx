
import React from "react";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
};

const SwipeStyleLogo = ({ className = "", size = "md", withText = true }: LogoProps) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`relative ${sizes[size]}`}>
        {/* Enhanced logo container with animation */}
        <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
        <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-black to-gray-800 border-2 border-white/50 overflow-hidden flex items-center justify-center relative z-10 animate-pulse-glow`}>
          {/* Enhanced minimalist swipe logo - stylized S with animation */}
          <svg 
            className="w-2/3 h-2/3" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M18 8C16 5 13 4 10 4C7 4 4 6 4 9.5C4 13 7 14 10 15L14 16C17 17 20 18 20 21.5C20 25 17 28 13 28C10 28 7 26 5 23" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
            <path 
              d="M5 19L3 21M19 7L21 5" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="white" className="animate-pulse">
              <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </div>
      {withText && (
        <h1 className={`font-bold ${textSizes[size]} text-white tracking-tight relative`}>
          <span className="bg-clip-text bg-gradient-to-r from-white to-white/80 animate-pulse-glow">Swipe</span>
          <span className="text-white">Style</span>
          <span className="absolute -top-1 -right-4 text-xs bg-white text-black px-1 rounded-sm transform rotate-12">PRO</span>
        </h1>
      )}
    </div>
  );
};

export default SwipeStyleLogo;
