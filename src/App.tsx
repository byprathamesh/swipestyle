
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
import { useState } from "react";

// Create pages for the new navigation items
const Saved = () => (
  <div className="min-h-screen bg-background pl-16 pt-8">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Your Saved Items</h1>
      <p className="text-white/70">Your saved items will appear here.</p>
    </div>
  </div>
);

const Celebrity = () => (
  <div className="min-h-screen bg-background pl-16 pt-8">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Celebrity Spotted Styles</h1>
      <p className="text-white/70">Trending celebrity outfits will appear here.</p>
    </div>
  </div>
);

const Messages = () => (
  <div className="min-h-screen bg-background pl-16 pt-8">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Messages</h1>
      <p className="text-white/70">Your messages will appear here.</p>
    </div>
  </div>
);

const Notifications = () => (
  <div className="min-h-screen bg-background pl-16 pt-8">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Notifications</h1>
      <p className="text-white/70">Your notifications will appear here.</p>
    </div>
  </div>
);

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
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
  );
};

export default App;
