
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
        <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
        <div className={`${sizes[size]} rounded-full flex items-center justify-center relative z-10`}>
          {/* Hanger Logo SVG */}
          <svg 
            className="w-full h-full" 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M100 30C91.716 30 85 36.716 85 45C85 50.5 88 55.5 93 58L60 90L27 58C32 55.5 35 50.5 35 45C35 36.716 28.284 30 20 30C11.716 30 5 36.716 5 45C5 53.284 11.716 60 20 60C21.5 60 23 59.784 24.5 59.352L100 135L175.5 59.352C177 59.784 178.5 60 180 60C188.284 60 195 53.284 195 45C195 36.716 188.284 30 180 30C171.716 30 165 36.716 165 45C165 50.5 168 55.5 173 58L140 90L107 58C112 55.5 115 50.5 115 45C115 36.716 108.284 30 100 30Z" 
              fill="white" 
            />
            <path 
              d="M65 120L50 135C50 135 60 170 100 170C140 170 150 135 150 135L135 120"
              stroke="white"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {withText && (
        <h1 className={`font-bold ${textSizes[size]} text-white tracking-tight relative`}>
          <span className="bg-clip-text bg-gradient-to-r from-white to-white/80">Swipe</span>
          <span className="text-white">Style</span>
          <span className="absolute -top-1 -right-4 text-xs bg-white text-black px-1 rounded-sm transform rotate-12">PRO</span>
        </h1>
      )}
    </div>
  );
};

export default SwipeStyleLogo;
