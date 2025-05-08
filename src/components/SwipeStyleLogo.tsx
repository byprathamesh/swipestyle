
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
        <div className="absolute inset-0 bg-swipestyle-pink rounded-full animate-pulse-glow opacity-75" />
        <div className={`${sizes[size]} rounded-full bg-gradient-to-br from-swipestyle-pink to-swipestyle-blue overflow-hidden flex items-center justify-center relative z-10`}>
          {/* Stylized S with swipe curve */}
          <svg 
            className="w-2/3 h-2/3" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M18 7C16.5 4 14 3 12 3C8.5 3 7 6 7 8C7 10 8 12 11 13L14 14C17 15 18 16 18 18C18 20 16.5 21 14 21C11.5 21 10 19.5 9 17" 
              stroke="white" 
              strokeWidth="2.5" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {withText && (
        <h1 className={`font-bold ${textSizes[size]} swipestyle-gradient-text`}>
          <span>SwipeStyle</span>
        </h1>
      )}
    </div>
  );
};

export default SwipeStyleLogo;
