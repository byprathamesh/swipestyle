
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
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.slice(0, 5).map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 ${
                location.pathname === item.path 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  // For desktop, show side navigation with enhanced styling
  return (
    <div className="fixed top-0 left-0 h-full w-16 bg-background border-r border-border flex flex-col items-center py-6 z-50">
      <BrandLogo withText={false} className="mb-8" />
      
      <div className="flex flex-col items-center space-y-8 mt-4">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`group flex flex-col items-center justify-center relative ${
              location.pathname === item.path 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground transition-colors"
            }`}
            title={item.label}
          >
            <item.icon className="h-6 w-6" />
            
            {/* Active indicator with animation */}
            {location.pathname === item.path && (
              <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full animate-pulse" />
            )}
            
            {/* Enhanced tooltip */}
            <span className="absolute left-14 whitespace-nowrap bg-background px-3 py-1.5 rounded-md border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all text-sm shadow-lg">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
