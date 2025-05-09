
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { designs, outfits } from "@/data/mockData";
import { Heart, Share2, ArrowLeft, Star, ThumbsUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Detail = () => {
  const { type, id } = useParams();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("details");
  
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

  // Alternative "similar" items with fake comparative pricing
  const alternativeItems = [
    {
      name: "Budget Option",
      price: (isDesign ? item.price : item.items.reduce((sum, i) => sum + i.price, 0)) * 0.6,
      rating: 3.8,
      image: "https://images.unsplash.com/photo-1583744946564-b52d01c96e70?auto=format&fit=crop&w=300",
      store: "BudgetFashion"
    },
    {
      name: "Mid-range Alternative",
      price: (isDesign ? item.price : item.items.reduce((sum, i) => sum + i.price, 0)) * 0.8,
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=300",
      store: "StyleMart"
    },
    {
      name: "Premium Choice",
      price: (isDesign ? item.price : item.items.reduce((sum, i) => sum + i.price, 0)) * 1.2,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=300",
      store: "LuxuryWear"
    }
  ];

  return (
    <div className={`min-h-screen bg-background ${!isMobile ? 'pl-16' : 'pb-16'}`}>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center gap-1 text-muted-foreground mb-6 hover:text-white transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to explore</span>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image with enhanced display */}
          <div className="aspect-[3/4] rounded-2xl overflow-hidden relative group">
            <img 
              src={image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Type badge with animation */}
            <div className="absolute top-4 left-4">
              <div className={`px-3 py-1 rounded-full text-white text-xs font-medium animate-pulse-glow ${
                isDesign ? "bg-white/90 text-black" : "bg-black/70 border border-white/30"
              }`}>
                {isDesign ? "Design" : "Outfit"}
              </div>
            </div>
            
            {/* Image overlay with gradient and effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Product Info with enhanced UI */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <Link to={`/creator/${item.creator.id}`} className="flex items-center gap-2 group">
                <img 
                  src={item.creator.avatar} 
                  alt={item.creator.displayName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-white transition-all"
                />
                <div>
                  <p className="font-medium group-hover:text-white transition-colors">{item.creator.displayName}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.creator.isVerified ? "Verified Creator" : "Creator"}
                  </p>
                </div>
              </Link>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {item.description}
            </p>

            <Tabs defaultValue="details" className="w-full mb-6" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-4">
                {isDesign ? (
                  <div>
                    <p className="text-3xl font-bold mb-4">${item.price.toFixed(2)}</p>
                    
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-white text-black hover:bg-white/90 rounded-full" 
                        onClick={() => toast.success("Added to saved collection!")}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Save Item
                      </Button>
                      <Button 
                        variant="outline" 
                        className="rounded-full border-white/20" 
                        onClick={() => toast.success("Saved to favorites!")}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-3xl font-bold mb-4">
                      ${item.items.reduce((sum, i) => sum + i.price, 0).toFixed(2)}
                    </p>
                    
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-white text-black hover:bg-white/90 rounded-full"
                        onClick={() => toast.success("Added to saved collection!")}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Save Outfit
                      </Button>
                      <Button 
                        variant="outline" 
                        className="rounded-full border-white/20"
                        onClick={() => toast.success("Shared with friends!")}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="alternatives" className="mt-4 space-y-4">
                <p className="text-sm text-muted-foreground mb-2">Similar items at different price points:</p>
                {alternativeItems.map((alt, index) => (
                  <Card key={index} className="bg-black/40 border-white/10 overflow-hidden">
                    <CardContent className="p-0 flex items-stretch">
                      <div className="w-24 h-24">
                        <img src={alt.image} alt={alt.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-3 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-white">{alt.name}</p>
                            <p className="text-xs text-muted-foreground">{alt.store}</p>
                          </div>
                          <p className="font-bold text-lg">${alt.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center mt-2">
                          <div className="flex">
                            {Array.from({length: 5}).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(alt.rating) ? "text-white" : "text-white/20"}`} />
                            ))}
                          </div>
                          <span className="text-xs ml-1 text-muted-foreground">{alt.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="comparison" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                      <img src={image} alt="Original" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">Original</p>
                      <p className="text-3xl font-bold">
                        ${(isDesign ? item.price : item.items.reduce((sum, i) => sum + i.price, 0)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 h-px w-full my-4"></div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 relative">
                      <img src={alternativeItems[0].image} alt="Best Match" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">Best Match</p>
                      <p className="text-3xl font-bold">${alternativeItems[0].price.toFixed(2)}</p>
                      <div className="flex items-center mt-1">
                        <p className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                          Save ${((isDesign ? item.price : item.items.reduce((sum, i) => sum + i.price, 0)) - alternativeItems[0].price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-white text-black hover:bg-white/90 mt-4 rounded-full"
                    onClick={() => toast.success("Item added to saved collection!")}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Save Alternative
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Stats */}
            <div className="flex items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-white" />
                <span>{item.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" />
                <span>{item.comments.toLocaleString()}</span>
              </div>
              <div className="text-muted-foreground">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            {/* Tags with enhanced styling */}
            <div className="flex flex-wrap gap-2 mb-8">
              {"tags" in item && item.tags.map(tag => (
                <div key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 cursor-pointer transition-colors">
                  #{tag}
                </div>
              ))}
            </div>
            
            {/* Outfit Items with enhanced styling */}
            {!isDesign && activeTab === "details" && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Items in this outfit
                </h3>
                <div className="space-y-3">
                  {item.items.map(outfitItem => (
                    <Card key={outfitItem.id} className="bg-black/40 border-white/10 hover:border-white/20 transition-colors">
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
                          <div className="flex flex-col items-end">
                            <p className="font-semibold">${outfitItem.price.toFixed(2)}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs p-0 h-auto hover:bg-transparent hover:text-white"
                              onClick={() => toast.success(`Added ${outfitItem.title} to saved collection!`)}
                            >
                              <Heart className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                          </div>
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
