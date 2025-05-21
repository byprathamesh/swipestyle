"use client";

import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { SwapItem, User } from '@/lib/types'; // Import from local lib

// interface CardData { // Replace with SwapItem
//   id: number; // id will be string in SwapItem
//   title: string;
//   description: string;
//   imageUrl: string;
// }

const initialCards: SwapItem[] = [
  {
    id: "1",
    userId: "user_placeholder_1",
    title: "Vintage Denim Jacket",
    description: "Size M, good condition. Worn a few times.",
    imageUrl: "/assets/fashion/jacket.jpg", // Placeholder image
    category: "outerwear",
    condition: "good",
    availability: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "user_placeholder_2",
    title: "Floral Summer Dress",
    description: "Size S, brand new with tags. Never worn.",
    imageUrl: "/assets/fashion/dress.jpg", // Placeholder image
    category: "dresses",
    condition: "new",
    availability: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // ... Add more initial cards matching SwapItem structure
  {
    id: "3",
    userId: "user_placeholder_3",
    title: "Leather Ankle Boots",
    description: "Size 38, used but in great shape. Comfortable.",
    imageUrl: "/assets/fashion/boots.jpg",
    category: "shoes",
    condition: "used",
    availability: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    userId: "user_placeholder_4",
    title: "Striped Cotton Shirt",
    description: "Size L, excellent condition. Soft cotton.",
    imageUrl: "/assets/fashion/shirt.jpg",
    category: "tops",
    condition: "good",
    availability: "available",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function HomePage() {
  const [cards, setCards] = useState<SwapItem[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Set to true initially
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/proxy/items'); 
        if (!response.ok) {
          throw new Error(`Failed to fetch items: ${response.statusText} (${response.status})`);
        }
        const data = await response.json();
        // Ensure data is an array, and map to SwapItem if necessary (though backend should send correct structure)
        const fetchedCards: SwapItem[] = Array.isArray(data) ? data : (data.items || []); // Adjust based on actual backend response
        
        setCards(fetchedCards.length > 0 ? fetchedCards : initialCards); // Use fetched data or fallback
      } catch (err: any) {
        setError(err.message);
        setCards(initialCards); // Fallback to initial cards on error
        console.error("Error fetching items:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handleSwipe = (direction: string) => {
    console.log(`Swiped ${direction}`);
    // Here you would typically handle the swipe action, e.g.:
    // - Send a request to the backend (like, dislike, superlike)
    // - Update UI to show a match or new card
    // For this basic example, we'll just move to the next card
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    onSwipedUp: () => handleSwipe("up"), // Optional: for super like or other actions
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Loading items...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Error loading items!</h1>
        <p>{error}</p>
        <p className="mt-2">Showing default items.</p>
      </div>
    );
  }

  if (cards.length === 0 || currentIndex >= cards.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">No more items to show!</h1>
        <p>Check back later for new listings.</p>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Swipe & Swap</h1>
      <div
        {...handlers}
        className="relative w-full max-w-sm h-[70vh] max-h-[500px] bg-white rounded-xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <img
          src={currentCard.imageUrl}
          alt={currentCard.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <h2 className="text-2xl font-semibold">{currentCard.title}</h2>
          <p className="text-sm mt-1">{currentCard.description}</p>
        </div>
      </div>
      <div className="mt-8 flex space-x-6">
        <button 
          onClick={() => handleSwipe("left")}
          className="p-4 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-transform transform hover:scale-110 focus:outline-none"
        >
          Nope
        </button>
        <button 
          onClick={() => handleSwipe("up")}
          className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110 focus:outline-none"
        >
          Super
        </button>
        <button 
          onClick={() => handleSwipe("right")}
          className="p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110 focus:outline-none"
        >
          Like
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-500">{`Card ${currentIndex + 1} of ${cards.length}`}</p>
      <nav className="mt-8 flex flex-col items-center space-y-2">
        <div>
          <a href="/login" className="text-blue-500 hover:underline p-2">Login</a>
          <a href="/signup" className="text-blue-500 hover:underline p-2">Signup</a>
        </div>
        <div>
          <a href="/list-item" className="text-green-600 hover:underline p-2 font-semibold">List an Item for Swap</a>
        </div>
        <div>
          <a href="/preferences" className="text-purple-600 hover:underline p-2 font-semibold">User Preferences</a>
        </div>
        <div>
          <a href="/ai-stylist" className="text-teal-600 hover:underline p-2 font-semibold">AI Stylist</a>
        </div>
        <div>
          <a href="/price-checker" className="text-orange-600 hover:underline p-2 font-semibold">Price Checker</a>
        </div>
      </nav>
    </div>
  );
} 