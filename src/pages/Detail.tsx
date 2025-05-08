
import React from "react";
import { useParams, Link } from "react-router-dom";
import { designs, outfits } from "@/data/mockData";
import { Heart, Share2, ShoppingCart, MessageSquare, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/sonner";

const Detail = () => {
  const { type, id } = useParams();
  const isMobile = useIsMobile();
  
  // Find the item based on type and ID
  const item = type === "designs" 
    ? designs.find(d => d.id === id)
    : outfits.find(o => o.id === id);
    
  if (!item) {
    return (
      <div className={`min-h-screen bg-background ${!isMobile ? 'pl-16' : 'pb-16'} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
          <Link to="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }
  
  // Check if item is a design or outfit
  const isDesign = "images" in item;
  const image = isDesign ? item.images[0] : item.items[0].image;

  return (
    <div className={`min-h-screen bg-background ${!isMobile ? 'pl-16' : 'pb-16'}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to explore</span>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
            <img 
              src={image} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
            
            {/* Type badge */}
            <div className="absolute top-4 left-4">
              <div className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                isDesign ? "bg-primary" : "bg-secondary"
              }`}>
                {isDesign ? "Design" : "Outfit"}
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <Link to={`/creator/${item.creator.id}`} className="flex items-center gap-2">
                <img 
                  src={item.creator.avatar} 
                  alt={item.creator.displayName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{item.creator.displayName}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.creator.isVerified ? "Verified Creator" : "Creator"}
                  </p>
                </div>
              </Link>
            </div>
            
            <p className="text-muted-foreground mb-6">
              {item.description}
            </p>

            {isDesign ? (
              <div className="mb-6">
                <p className="text-3xl font-bold mb-4">${item.price.toFixed(2)}</p>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 swipestyle-gradient rounded-full" 
                    onClick={() => toast.success("Added to cart!")}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-full" 
                    onClick={() => toast.success("Saved to favorites!")}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => toast.success("Copied link to clipboard!")}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <p className="text-3xl font-bold mb-4">
                  ${item.items.reduce((sum, i) => sum + i.price, 0).toFixed(2)}
                </p>
                
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 swipestyle-gradient rounded-full"
                    onClick={() => toast.success("Added all items to cart!")}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add All to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => toast.success("Saved to favorites!")}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => toast.success("Copied link to clipboard!")}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Stats */}
            <div className="flex items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-swipestyle-pink" />
                <span>{item.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{item.comments.toLocaleString()}</span>
              </div>
              <div className="text-muted-foreground">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {"tags" in item && item.tags.map(tag => (
                <div key={tag} className="px-3 py-1 bg-accent rounded-full text-xs">
                  #{tag}
                </div>
              ))}
            </div>
            
            {/* Outfit Items */}
            {!isDesign && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Items in this outfit</h3>
                <div className="space-y-3">
                  {item.items.map(outfitItem => (
                    <Card key={outfitItem.id}>
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={outfitItem.image} 
                            alt={outfitItem.title} 
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{outfitItem.title}</p>
                            <p className="text-sm text-muted-foreground">{outfitItem.type}</p>
                          </div>
                          <p className="font-semibold">${outfitItem.price.toFixed(2)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
