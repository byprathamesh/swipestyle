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
  condition: 'new' | 'like-new' | 'good' | 'fair';
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Add other shared types, interfaces, enums, constants here 