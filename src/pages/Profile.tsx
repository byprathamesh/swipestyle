
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { users, designs } from "@/data/mockData";
import { Heart, Share2, MessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const isMobile = useIsMobile();
  // For demo, we'll show the first user
  const user = users[0];
  
  return (
    <div className={`min-h-screen bg-background ${!isMobile ? 'pl-16' : 'pb-16'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-background shadow-lg">
            <img 
              src={user.avatar} 
              alt={user.displayName}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
              <h1 className="text-2xl font-bold">{user.displayName}</h1>
              {user.isVerified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary text-xs font-medium">
                  Verified Creator
                </span>
              )}
            </div>
            
            <p className="text-muted-foreground mb-4">@{user.username}</p>
            <p className="mb-4 max-w-lg">{user.bio}</p>
            
            <div className="flex justify-center md:justify-start gap-8 mb-6">
              <div className="text-center">
                <p className="font-bold">{user.stats?.designs}</p>
                <p className="text-sm text-muted-foreground">Designs</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{user.followers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{user.following.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="font-bold">{user.stats?.sales.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Sales</p>
              </div>
            </div>
            
            <div className="flex gap-3 justify-center md:justify-start">
              <Button className="swipestyle-gradient rounded-full">Follow</Button>
              <Button variant="outline" className="rounded-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Message
              </Button>
              <Button variant="outline" className="rounded-full">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/settings">
                <Settings className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Profile Tabs */}
        <Tabs defaultValue="designs">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="designs">Designs</TabsTrigger>
            <TabsTrigger value="outfits">Outfits</TabsTrigger>
            <TabsTrigger value="liked">Liked</TabsTrigger>
          </TabsList>
          
          <TabsContent value="designs">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {designs.filter(d => d.creator.id === user.id).map(design => (
                <Link key={design.id} to={`/designs/${design.id}`} className="group">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                    <img 
                      src={design.images[0]} 
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-3">
                      <h3 className="font-medium text-white">{design.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3 text-swipestyle-pink" />
                          <span className="text-xs text-white/90">{design.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-white/90" />
                          <span className="text-xs text-white/90">{design.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="outfits">
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground">No outfits created yet</p>
              <Button className="mt-4 rounded-full">Create Outfit</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="liked">
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-muted-foreground">No likes yet</p>
              <Link to="/">
                <Button className="mt-4 rounded-full">Explore Designs</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
