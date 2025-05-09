
import React from "react";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
};

const BrandLogo = ({ className = "", size = "md", withText = true }: LogoProps) => {
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
        <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse-glow"></div>
        <img 
          src="/lovable-uploads/e7745860-5461-4457-b708-9323e360325d.png"
          alt="Brand Logo" 
          className={`${sizes[size]} object-cover rounded-full shadow-lg`}
        />
      </div>
      
      {withText && (
        <h1 className={`font-bold ${textSizes[size]} text-white tracking-tight relative`}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">Swipe</span>
          <span className="text-white">Style</span>
          <span className="absolute -top-1 -right-4 text-xs bg-white text-black px-1 rounded-sm transform rotate-12 font-bold shadow-sm">PRO</span>
        </h1>
      )}
    </div>
  );
};

export default BrandLogo;
