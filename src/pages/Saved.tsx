import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient"; // Import your Supabase client
// import { designs as mockDesigns } from "@/data/mockData"; // Keep for fallback or type reference if needed

// Define a type for your design data from Supabase
// This should ideally match your Supabase table structure or be generated
interface Design {
  id: string;
  title: string | null;
  images: string[] | null; // Assuming images are stored as an array of URLs/paths
  price: number | null;
  // Add other fields like user_id, creator details if you fetch them
  // For example, if you join with a profiles table:
  // profiles?: { display_name: string | null; avatar_url: string | null; } | null;
}

const fetchSavedDesigns = async (): Promise<Design[]> => {
  // This is a placeholder query.
  // You'll need to define what "saved" means.
  // Is it all designs? Designs linked to the current user?
  // For now, let's fetch all designs from a 'designs' table.
  const { data, error } = await supabase
    .from("designs") // Replace 'designs' with your actual table name
    .select(`
      id,
      title,
      images,
      price
    `)
    .limit(9); // Example: limit to 9 items like the mock data

  if (error) {
    console.error("Error fetching saved designs:", error);
    throw new Error(error.message);
  }
  return data || [];
};

const Saved = () => {
  const { data: savedDesigns, isLoading, isError, error } = useQuery<Design[], Error>({
    queryKey: ["savedDesigns"], // Unique key for this query
    queryFn: fetchSavedDesigns,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8 flex justify-center items-center">
        <p>Loading saved items...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8 flex justify-center items-center">
        <p>Error loading items: {error?.message}</p>
      </div>
    );
  }

  if (!savedDesigns || savedDesigns.length === 0) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Saved Items</h1>
          <p>No saved items found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pl-16 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Saved Items</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {savedDesigns.map((design) => (
            <div key={design.id} className="bg-black/30 rounded-xl overflow-hidden border border-white/10 animate-fade-in">
              <div className="aspect-[2/3] relative">
                <img
                  src={design.images && design.images.length > 0 ? design.images[0] : '/assets/fashion/placeholder.jpg'} // Fallback image
                  alt={design.title || 'Design image'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-0 p-3">
                    <p className="text-sm font-semibold text-white">{design.title || 'Untitled Design'}</p>
                    {design.price !== null && (
                      <p className="text-xs text-white/70">${design.price}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Saved; 