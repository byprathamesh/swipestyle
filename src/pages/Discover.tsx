
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent } from "@/components/ui/card";
import { designs, outfits, contests } from "@/data/mockData";
import { Link } from "react-router-dom";

const Discover = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`min-h-screen bg-background ${!isMobile ? 'pl-16' : 'pb-16'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 swipestyle-gradient-text">Discover</h1>
        
        {/* Contests Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Active Contests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contests.filter(c => c.status === "ongoing").map(contest => (
              <Link key={contest.id} to={`/contests/${contest.id}`}>
                <Card className="overflow-hidden">
                  <div className="h-40 w-full overflow-hidden">
                    <img 
                      src={contest.coverImage}
                      alt={contest.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold">{contest.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {contest.description}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {contest.entries} entries
                      </span>
                      <span className="text-xs text-primary font-medium">
                        Ends {new Date(contest.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Trending Designs */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Trending Designs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {designs.slice(0, 6).map(design => (
              <Link key={design.id} to={`/designs/${design.id}`} className="group">
                <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                  <img 
                    src={design.images[0]} 
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3">
                    <h3 className="font-medium text-white text-sm">{design.title}</h3>
                    <p className="text-white/80 text-xs">${design.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Popular Outfits */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Popular Outfits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {outfits.map(outfit => (
              <Link key={outfit.id} to={`/outfits/${outfit.id}`}>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-bold">{outfit.title}</h3>
                    <div className="flex mt-2 gap-2">
                      {outfit.items.map((item, idx) => (
                        <div key={item.id} className="w-16 h-16 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center gap-2">
                        <img 
                          src={outfit.creator.avatar}
                          alt={outfit.creator.displayName}
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="text-xs">{outfit.creator.displayName}</span>
                      </div>
                      <span className="text-sm font-medium">
                        ${outfit.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Discover;
