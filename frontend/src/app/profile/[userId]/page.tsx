'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { SwapItem, User } from '@/lib/types'; // Using local types

// Mock function to fetch user details - replace with actual API call
const fetchUserDetails = async (userId: string): Promise<User | null> => {
  console.log(`Fetching details for user: ${userId}`);
  const response = await fetch(`/api/proxy/users/${userId}`);
  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error('Failed to fetch user details');
  }
  return response.json();
};

// Mock function to fetch items listed by a user - replace with actual API call
const fetchUserItems = async (userId: string): Promise<SwapItem[]> => {
  console.log(`Fetching items for user: ${userId}`);
  const response = await fetch(`/api/proxy/items?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user items');
  }
  const items: SwapItem[] = await response.json();
  return items;
};

// Simple Social Share Component (can be expanded)
const SocialShareButtons = ({ itemLink, itemTitle }: { itemLink: string, itemTitle: string }) => {
  const encodedLink = encodeURIComponent(itemLink);
  const encodedTitle = encodeURIComponent(itemTitle);

  return (
    <div className="mt-2 flex space-x-2">
      <a href={`https://wa.me/?text=${encodedTitle}%20${encodedLink}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded">WhatsApp</a>
      {/* Add more social media share buttons (Instagram might need API or specific handling) */}
      <a href={`https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-400 hover:bg-blue-500 text-white py-1 px-2 rounded">Twitter</a>
      <button onClick={() => navigator.clipboard.writeText(itemLink)} className="text-xs bg-gray-500 hover:bg-gray-600 text-white py-1 px-2 rounded">Copy Link</button>
    </div>
  );
};

export default function UserProfilePage() {
  const params = useParams();
  const userId = params?.userId as string; // Type assertion

  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<SwapItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const loadProfileData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [userDetails, userItems] = await Promise.all([
          fetchUserDetails(userId),
          fetchUserItems(userId),
        ]);
        
        if (!userDetails) {
          throw new Error('User not found');
        }
        setUser(userDetails);
        setItems(userItems);
      } catch (err: any) {
        setError(err.message);
        console.error("Error loading profile data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfileData();
  }, [userId]);

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading profile...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-600">Error: {error}</div>;
  }

  if (!user) {
    return <div className="container mx-auto p-4 text-center">User not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8 text-center">
        {/* Basic Profile Header - enhance with profile picture, bio etc. later */}
        <h1 className="text-4xl font-bold">{user.name || `User ${user.id}`}</h1>
        <p className="text-gray-600">{user.email}</p>
        {/* Link to edit preferences if this is the logged-in user's profile */}
        {/* {isCurrentUserProfile && <a href="/preferences" className="text-blue-500">Edit Preferences</a>} */}
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Items for Swap</h2>
        {items.length === 0 ? (
          <p>This user has no items listed for swap yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                <div className="w-full h-64 bg-gray-200">
                  <img 
                    src={item.imageUrl.startsWith('http') ? item.imageUrl : `http://localhost:3000${item.imageUrl}`} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/300x300.png?text=Image+Not+Found'; }} // Fallback image
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold mb-1 truncate" title={item.title}>{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 flex-grow truncate" title={item.description}>{item.description}</p>
                  <p className="text-xs text-gray-500">Category: {item.category}</p>
                  <p className="text-xs text-gray-500">Condition: {item.condition}</p>
                  {/* Item link would ideally be /items/[itemId] - not implemented yet */}
                  <SocialShareButtons itemLink={`http://localhost:3000/items/${item.id}`} itemTitle={item.title} />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 