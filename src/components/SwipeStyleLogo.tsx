
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
        {/* Logo container with animation */}
        <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
        <div className={`${sizes[size]} rounded-full bg-black border-2 border-white overflow-hidden flex items-center justify-center relative z-10`}>
          {/* Stylized S with swipe motion */}
          <svg 
            className="w-3/4 h-3/4" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M18 7C16 4 12.5 3 10 3C6.5 3 4 5.5 4 8.5C4 11.5 6 13 10 14L14 15C18 16 20 17.5 20 20.5C20 23.5 17.5 26 14 26C11.5 26 8 25 6 22" 
              stroke="white" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
            <path 
              d="M6 18L3 21M18 6L21 3" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      {withText && (
        <h1 className={`font-bold ${textSizes[size]} text-white`}>
          SwipeStyle
        </h1>
      )}
    </div>
  );
};

export default SwipeStyleLogo;
