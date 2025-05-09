import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { feedItems } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Heart, ArrowLeft, ShoppingBag, Recycle, Tag } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const path = window.location.pathname;
  const isDesignPage = path.includes("/designs/");

  // Find the item from our mock data
  const foundItem = feedItems.find(item => item.id === id);
  
  if (!foundItem) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Item not found</h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }
  
  // Determine if it's a design or outfit
  const isDesign = "images" in foundItem;
  const image = isDesign ? foundItem.images[0] : foundItem.items[0].image;
  const title = foundItem.title;
  const description = foundItem.description || "No description available";
  const creator = foundItem.creator;
  const price = isDesign ? foundItem.price : foundItem.items.reduce((sum, item) => sum + item.price, 0);
  
  // Replace random Unsplash images with local images
  const localFashionImages = [
    "/assets/fashion/fashion1.jpg",
    "/assets/fashion/fashion2.jpg",
    "/assets/fashion/fashion3.jpg",
    "/assets/fashion/fashion4.jpg",
    "/assets/fashion/fashion5.jpg",
    "/assets/fashion/fashion6.jpg",
    "/assets/fashion/fashion7.jpg",
    "/assets/fashion/fashion8.jpg",
    "/assets/fashion/fashion9.jpg",
    "/assets/fashion/fashion10.jpg",
    "/assets/fashion/fashion11.jpg",
    "/assets/fashion/fashion12.jpg",
  ];

  // Generate mock similar items with price comparisons
  const similarItems = [
    {
      image: localFashionImages[0],
      price: price * 0.8,
      source: "FashionMart",
      url: "#"
    },
    {
      image: localFashionImages[1],
      price: price * 1.2,
      source: "StyleHub",
      url: "#"
    },
    {
      image: localFashionImages[2],
      price: price * 0.65,
      source: "ThriftFinder",
      isThrift: true,
      url: "#"
    }
  ];

  const handleBuy = (option: 'buy' | 'thrift' | 'rent') => {
    const messages = {
      buy: `Adding ${title} to your cart - $${price.toFixed(2)}`,
      thrift: `Looking for thrift options - Around $${(price * 0.4).toFixed(2)}`,
      rent: `Preparing rental for ${title} - $${(price * 0.15).toFixed(2)}/day`
    };
    
    toast.success(`${option === 'buy' ? 'Added to cart!' : option === 'thrift' ? 'Thrift search started' : 'Rental prepared'}`, {
      description: messages[option]
    });
  };

  return (
    <div className="min-h-screen bg-background pl-16 pt-6 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button and header */}
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="hover:bg-white/10 rounded-full p-2"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-xl">
              <img 
                src={image} 
                alt={title} 
                className="w-full object-cover aspect-[3/4]"
              />
            </div>
            
            {/* Type badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="outline" className="bg-white/90 text-black py-1.5 px-3 font-medium text-xs backdrop-blur-sm">
                {isDesignPage ? "Design" : "Outfit"}
              </Badge>
            </div>
          </div>
          
          {/* Content Section */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            
            {/* Creator info */}
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={creator.avatar} 
                alt={creator.displayName} 
                className="w-10 h-10 rounded-full object-cover border border-white/30"
              />
              <div>
                <p className="font-medium">{creator.displayName}</p>
                <p className="text-sm text-white/70">{creator.followers.toLocaleString()} followers</p>
              </div>
              
              {creator.isVerified && (
                <Badge variant="outline" className="bg-white/20 py-1 px-2">Verified</Badge>
              )}
            </div>
            
            {/* Price and buy options */}
            <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-white/70">Price</p>
                  <p className="text-3xl font-bold">${price.toFixed(2)}</p>
                </div>
                
                <Button 
                  className="bg-white text-black hover:bg-white/90 rounded-full px-6"
                  onClick={() => handleBuy('buy')}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button 
                  variant="outline" 
                  className="border-white/20 hover:bg-white/10"
                  onClick={() => handleBuy('thrift')}
                >
                  <Recycle className="w-4 h-4 mr-2" />
                  Find Thrifted ~${(price * 0.4).toFixed(2)}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-white/20 hover:bg-white/10"
                  onClick={() => handleBuy('rent')}
                >
                  <Tag className="w-4 h-4 mr-2" />
                  Rent ${(price * 0.15).toFixed(2)}/day
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="description">
              <TabsList className="bg-white/10 border border-white/20">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="similar">Similar Items</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-white/80 leading-relaxed">{description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {foundItem.tags?.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="outline"
                        className="bg-white/10 hover:bg-white/20 cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="similar" className="mt-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Price Comparisons
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {similarItems.map((item, i) => (
                      <div 
                        key={i} 
                        className="border border-white/10 rounded-lg overflow-hidden bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <img 
                          src={item.image} 
                          alt={`Similar item ${i + 1}`} 
                          className="w-full h-40 object-cover"
                        />
                        
                        <div className="p-3">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">${item.price.toFixed(2)}</p>
                            {item.isThrift && (
                              <Badge className="bg-white/20 text-white text-xs">Thrift</Badge>
                            )}
                          </div>
                          <p className="text-sm text-white/70">{item.source}</p>
                          <Button 
                            variant="link" 
                            className="text-white/90 p-0 h-auto text-sm mt-2"
                            onClick={() => toast.info(`Redirecting to ${item.source}`)}
                          >
                            View Item →
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
