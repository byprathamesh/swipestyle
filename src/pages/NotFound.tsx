
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SwipeStyleLogo from "@/components/SwipeStyleLogo";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <SwipeStyleLogo size="lg" className="mb-8" />
      
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Oops! This page doesn't exist or has been styled away.
      </p>
      
      <Link to="/">
        <Button className="swipestyle-gradient rounded-full px-8">
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
