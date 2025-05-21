"use client";

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface CardData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const initialCards: CardData[] = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    description: "Size M, good condition. Worn a few times.",
    imageUrl: "/assets/fashion/jacket.jpg", // Placeholder image
  },
  {
    id: 2,
    title: "Floral Summer Dress",
    description: "Size S, brand new with tags. Never worn.",
    imageUrl: "/assets/fashion/dress.jpg", // Placeholder image
  },
  {
    id: 3,
    title: "Leather Ankle Boots",
    description: "Size 38, used but in great shape. Comfortable.",
    imageUrl: "/assets/fashion/boots.jpg", // Placeholder image
  },
  {
    id: 4,
    title: "Striped Cotton Shirt",
    description: "Size L, excellent condition. Soft cotton.",
    imageUrl: "/assets/fashion/shirt.jpg", // Placeholder image
  },
];

export default function HomePage() {
  const [cards, setCards] = useState<CardData[]>(initialCards);
  const [currentIndex, setCurrentIndex] = useState(0);

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
       <nav className="mt-8">
        <a href="/login" className="text-blue-500 hover:underline p-2">Login</a>
        <a href="/signup" className="text-blue-500 hover:underline p-2">Signup</a>
      </nav>
    </div>
  );
} 