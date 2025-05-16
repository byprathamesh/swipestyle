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
import Saved from "./pages/Saved";
import Celebrity from "./pages/Celebrity";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";

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
