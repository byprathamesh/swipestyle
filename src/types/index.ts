
export type User = {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  followers: number;
  following: number;
  isVerified: boolean;
  createdAt: string;
  stats?: {
    designs: number;
    sales: number;
    rating: number;
  };
};

export type Design = {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  creator: User;
  likes: number;
  comments: number;
  createdAt: string;
  category: string;
  tags: string[];
  isVideo?: boolean;
  aiRecommended?: boolean;
  shoppingOptions?: {
    buy: boolean;
    thrift: boolean;
    rent: boolean;
  };
  similarItems?: Array<{
    image: string;
    price: number;
    source: string;
    url: string;
  }>;
};

export type Comment = {
  id: string;
  text: string;
  user: User;
  createdAt: string;
  likes: number;
};

export type OutfitItem = {
  id: string;
  designId: string;
  type: 'top' | 'bottom' | 'shoes' | 'accessory' | 'outerwear';
  image: string;
  title: string;
  price: number;
};

export type Outfit = {
  id: string;
  title: string;
  description: string;
  items: OutfitItem[];
  creator: User;
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
  isVideo?: boolean;
  aiRecommended?: boolean;
  shoppingOptions?: {
    buy: boolean;
    thrift: boolean;
    rent: boolean;
  };
  similarItems?: Array<{
    image: string;
    price: number;
    source: string;
    url: string;
  }>;
};

export type Contest = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  prizes: string[];
  entries: number;
  coverImage: string;
  status: 'upcoming' | 'ongoing' | 'ended';
};

export type FeedItem = Design | Outfit;

export type Notification = {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'purchase' | 'system' | 'contest';
  message: string;
  createdAt: string;
  read: boolean;
  data?: {
    userId?: string;
    designId?: string;
    outfitId?: string;
    contestId?: string;
  };
};
