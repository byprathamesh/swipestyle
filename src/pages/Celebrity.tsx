import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
// import { designs as mockDesigns } from "@/data/mockData"; // No longer needed

// Assuming a similar Design type as in Saved.tsx
interface Design {
  id: string;
  title: string | null;
  images: string[] | null;
  price: number | null;
  // You might want to add fields like 'spotted_location' or 'celebrity_name'
  // if your 'designs' table or a related table supports this.
  // For now, we'll rely on title and the general 'design' structure.
}

const fetchCelebrityStyles = async (): Promise<Design[]> => {
  // Placeholder: Fetch a few designs.
  // In a real scenario, you'd have a way to identify "celebrity" styles,
  // e.g., a specific tag, a boolean column 'is_celebrity_style', or a separate table.
  const { data, error } = await supabase
    .from("designs") // Replace 'designs' with your actual table name
    .select("id, title, images, price") // Add other relevant fields
    .order("created_at", { ascending: false }) // Example: show newest first
    .limit(6); // Match the mock data length

  if (error) {
    console.error("Error fetching celebrity styles:", error);
    throw new Error(error.message);
  }
  return data || [];
};

const Celebrity = () => {
  const { data: celebrityStyles, isLoading, isError, error } = useQuery<Design[], Error>({
    queryKey: ["celebrityStyles"],
    queryFn: fetchCelebrityStyles,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8 flex justify-center items-center">
        <p>Loading celebrity styles...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8 flex justify-center items-center">
        <p>Error loading styles: {error?.message}</p>
      </div>
    );
  }

   if (!celebrityStyles || celebrityStyles.length === 0) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Celebrity Spotted Styles</h1>
          <p>No celebrity styles found at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pl-16 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Celebrity Spotted Styles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {celebrityStyles.map((style) => (
            <div key={style.id} className="bg-black/30 rounded-xl overflow-hidden border border-white/10 flex animate-fade-in shadow-lg">
              <div className="aspect-[3/4] w-1/3 relative">
                <img
                  src={style.images && style.images.length > 0 ? style.images[0] : '/assets/fashion/placeholder.jpg'}
                  alt={style.title || 'Celebrity style'}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <h3 className="font-bold text-lg">{style.title || 'Stylish Look'}</h3>
                {/* This part was static, you might want to make it dynamic from Supabase data */}
                <p className="text-sm text-white/70 mb-2">Spotted at Fashion Week</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {/* This was also static, placeholder items */}
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="bg-black/50 px-2 py-1 rounded text-xs text-white/70">
                      Item #{j + 1}
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
};

export default Celebrity; 