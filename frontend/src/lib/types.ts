// Example shared type
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface SwapItem {
  id: string;
  userId: string; // ID of the user who listed the item
  title: string;
  description: string;
  category: string; // e.g., 'tops', 'bottoms', 'dresses', 'accessories'
  size?: string; // e.g., 'S', 'M', 'L', 'UK 10', 'US 6'
  brand?: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'used';
  imageUrl: string; // Make this mandatory for display
  tags?: string[]; // e.g., ['vintage', 'summer', 'boho']
  availability: 'available' | 'swapped' | 'reserved';
  postedBy?: User; // Optional: to include basic user info of the lister
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface SwapRequest {
  id: string;
  requesterId: string; // User making the request
  requesterItemIds: string[]; // Item(s) offered by the requester
  targetItemId: string; // Item desired from the other user
  targetUserId: string; // User who owns the target item
  status: 'pending' | 'accepted' | 'rejected' | 'counter-offered' | 'cancelled';
  message?: string; // Initial message with the request
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Add other shared types, interfaces, enums, constants here 