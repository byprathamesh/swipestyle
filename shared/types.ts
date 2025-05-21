// Example shared type
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface SwapItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: string;
  size?: string;
  brand?: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'used';
  imageUrl: string;
  tags?: string[];
  availability: 'available' | 'swapped' | 'reserved';
  postedBy?: User;
  createdAt: string;
  updatedAt: string;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  requesterItemIds: string[];
  targetItemId: string;
  targetUserId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'counter-offered' | 'cancelled';
  message?: string;
  createdAt: string;
  updatedAt: string;
}

// Add other shared types, interfaces, enums, constants here 