import React from "react";

// SVG for the hanger with SS logo (same as BrandLogo)
const HangerSSLogoSVG = ({ className = "", ...props }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 768 768"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="768" height="768" rx="0" fill="#111" />
    <path d="M384 160c-24 0-44 20-44 44 0 16 8 30 22 38l-120 120-120-120c14-8 22-22 22-38 0-24-20-44-44-44s-44 20-44 44 20 44 44 44c2 0 4 0 6-1l254 254 254-254c2 1 4 1 6 1 24 0 44-20 44-44s-20-44-44-44-44 20-44 44c0 16 8 30 22 38l-120 120-120-120c14-8 22-22 22-38 0-24-20-44-44-44z" fill="#fff"/>
    <path d="M249 480l-60 60s30 120 195 120 195-120 195-120l-60-60" stroke="#fff" strokeWidth="32" strokeLinecap="round" fill="none"/>
    <text x="230" y="540" fontFamily="'Inter',sans-serif" fontWeight="bold" fontSize="180" fill="#fff">SS</text>
  </svg>
);

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const SwipeStyleLogo = ({ className = "", size = "md" }: LogoProps) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };
  return (
    <div className={`flex items-center justify-center rounded-full bg-black ${sizes[size]} ${className}`}>
      <span className="text-white font-bold text-xl select-none">SS</span>
    </div>
  );
};

export default SwipeStyleLogo;
