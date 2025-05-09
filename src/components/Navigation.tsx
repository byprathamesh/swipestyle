
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Search, 
  Heart, 
  User, 
  Bell,
  MessageSquare,
  Star
} from "lucide-react";
import BrandLogo from "./BrandLogo";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Discover", path: "/discover" },
    { icon: MessageSquare, label: "Messages", path: "/messages" },
    { icon: Heart, label: "Saved", path: "/saved" },
    { icon: Star, label: "Celebrity", path: "/celebrity" },
    { icon: Bell, label: "Notifications", path: "/notifications" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  // For mobile, show bottom navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 z-50 shadow-lg">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.slice(0, 5).map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 transition-all duration-300 ${
                location.pathname === item.path 
                  ? "text-white scale-110" 
                  : "text-white/60 hover:text-white/80"
              }`}
            >
              <item.icon className="h-5 w-5" strokeWidth={2.5} fill={location.pathname === item.path ? "white" : "none"} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  // For desktop, show side navigation with enhanced styling
  return (
    <div className="fixed top-0 left-0 h-full w-16 bg-black/80 backdrop-blur-md border-r border-white/10 flex flex-col items-center py-6 z-50 shadow-lg">
      <BrandLogo withText={false} className="mb-8" />
      
      <div className="flex flex-col items-center space-y-8 mt-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={`group flex flex-col items-center justify-center relative ${
                isActive
                  ? "text-white" 
                  : "text-white/60 hover:text-white transition-colors"
              }`}
              title={item.label}
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? "bg-white/10" : "hover:bg-white/5"}`}>
                <item.icon 
                  className={`h-6 w-6 transition-transform ${isActive ? "scale-110" : "group-hover:scale-105"}`} 
                  strokeWidth={2.5}
                  fill={isActive ? "white" : "none"} 
                />
              </div>
              
              {/* Active indicator with animation */}
              {isActive && (
                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r-full animate-pulse" />
              )}
              
              {/* Enhanced tooltip */}
              <span className="absolute left-16 whitespace-nowrap bg-black/90 px-3 py-1.5 rounded-md border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all text-sm shadow-lg">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
