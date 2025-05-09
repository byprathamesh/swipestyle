
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import Navigation from "./components/Navigation";
import "./App.css";

// Create more detailed pages for the navigation items
const Saved = () => (
  <div className="min-h-screen bg-background pl-16 pt-8">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Your Saved Items</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-black/30 rounded-xl overflow-hidden border border-white/10 animate-fade-in">
            <div className="aspect-[2/3] relative">
              <img 
                src={`https://source.unsplash.com/random/300x450?fashion&${i}`}
                alt="Saved outfit"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 p-3">
                  <p className="text-sm font-semibold text-white">Saved Look #{i+1}</p>
                  <p className="text-xs text-white/70">$199.99</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Celebrity = () => (
  <div className="min-h-screen bg-background pl-16 pt-8">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Celebrity Spotted Styles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-black/30 rounded-xl overflow-hidden border border-white/10 flex animate-fade-in shadow-lg">
            <div className="aspect-[3/4] w-1/3 relative">
              <img 
                src={`https://source.unsplash.com/random/300x450?celebrity&${i}`}
                alt="Celebrity"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1">
              <h3 className="font-bold text-lg">Celebrity Name #{i+1}</h3>
              <p className="text-sm text-white/70 mb-2">Spotted at Fashion Week</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="bg-black/50 px-2 py-1 rounded text-xs text-white/70">
                    Item #{j+1}
                  </div>
                ))}
              </div>
              <button className="bg-white text-black text-sm font-medium px-3 py-1 rounded-full">
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Messages = () => (
  <div className="min-h-screen bg-background pl-16 pt-8">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-black/30 rounded-xl overflow-hidden border border-white/10 p-4 animate-fade-in hover:bg-black/40 transition-colors cursor-pointer">
            <div className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                <img 
                  src={`https://source.unsplash.com/random/100x100?person&${i}`}
                  alt="Contact"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">Fashion Stylist #{i+1}</h3>
                <p className="text-sm text-white/70">Check out this new collection!</p>
              </div>
              <div className="text-xs text-white/50">
                {i === 0 ? '2m ago' : i === 1 ? '1h ago' : `${i}d ago`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Notifications = () => (
  <div className="min-h-screen bg-background pl-16 pt-8">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-black/30 rounded-xl overflow-hidden border border-white/10 p-3 animate-fade-in hover:bg-black/40 transition-colors">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                {i % 3 === 0 ? '💰' : i % 3 === 1 ? '👗' : '🔥'}
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  {i % 3 === 0 
                    ? 'New discount available on your favorite items!' 
                    : i % 3 === 1 
                      ? 'Designer just released a new collection' 
                      : 'Your style received 50+ likes'}
                </p>
              </div>
              <div className="text-xs text-white/50">
                {i === 0 ? 'Just now' : `${i}h ago`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const App = () => {
  // Fix: Properly initialize QueryClient using useState
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/celebrity" element={<Celebrity />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/designs/:id" element={<Detail key="design" />} />
              <Route path="/outfits/:id" element={<Detail key="outfit" />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
