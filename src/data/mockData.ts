// Generate placeholder fashion images as data URLs
const generateFashionPlaceholder = (id: number): string => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'];
  const styles = ['Casual', 'Formal', 'Street', 'Chic', 'Boho', 'Vintage', 'Modern', 'Classic'];
  const color = colors[id % colors.length];
  const style = styles[id % styles.length];
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='200' y='280' text-anchor='middle' fill='white' font-size='32' font-family='Inter, sans-serif' font-weight='bold'%3E${style}%3C/text%3E%3Ctext x='200' y='320' text-anchor='middle' fill='white' font-size='18' font-family='Inter, sans-serif'%3EFashion %23${id + 1}%3C/text%3E%3C/svg%3E`;
};

// Generate avatar placeholder
const generateAvatarPlaceholder = (name: string): string => {
  const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444'];
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
  const color = colors[name.length % colors.length];
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='28' font-family='Inter, sans-serif' font-weight='bold'%3E${initials}%3C/text%3E%3C/svg%3E`;
};

export const feedItems = [
  {
    id: '1',
    title: 'Elegant Evening Dress',
    description: 'Stunning black evening dress perfect for special occasions. Made from premium silk with intricate beadwork.',
    images: [generateFashionPlaceholder(0)],
    creator: { 
      id: 'creator1',
      username: 'fashionista_jane',
      displayName: 'Jane Miller', 
      bio: 'Professional stylist & designer',
      avatar: generateAvatarPlaceholder('Jane Miller'), 
      followers: 12500, 
      following: 890,
      isVerified: true,
      createdAt: '2023-01-15',
      stats: { designs: 45, sales: 120, rating: 4.9 }
    },
    price: 299,
    likes: 1847,
    comments: 23,
    tags: ['evening', 'elegant', 'formal'],
    createdAt: '2024-01-01',
    category: 'Dresses',
    shoppingOptions: {
      buy: true,
      thrift: false,
      rent: true
    }
  },
  {
    id: '2',
    title: 'Casual Street Style',
    description: 'Trendy street style outfit featuring oversized denim jacket and distressed jeans. Perfect for weekend vibes.',
    images: [generateFashionPlaceholder(1)],
    creator: { 
      id: 'creator2',
      username: 'street_style_sam',
      displayName: 'Sam Rodriguez', 
      bio: 'Street style photographer',
      avatar: generateAvatarPlaceholder('Sam Rodriguez'), 
      followers: 8930, 
      following: 456,
      isVerified: true,
      createdAt: '2023-02-20',
      stats: { designs: 32, sales: 78, rating: 4.7 }
    },
    price: 89,
    likes: 2341,
    comments: 45,
    tags: ['casual', 'street', 'denim'],
    createdAt: '2024-01-02',
    category: 'Casual',
    shoppingOptions: {
      buy: true,
      thrift: true,
      rent: false
    }
  },
  {
    id: '3',
    title: 'Boho Chic Ensemble',
    description: 'Free-spirited boho look with flowing fabrics and earthy tones. Includes handmade accessories.',
    images: [generateFashionPlaceholder(2)],
    creator: { 
      id: 'creator3',
      username: 'boho_bella',
      displayName: 'Isabella Chen', 
      bio: 'Sustainable fashion advocate',
      avatar: generateAvatarPlaceholder('Isabella Chen'), 
      followers: 15670, 
      following: 1234,
      isVerified: true,
      createdAt: '2023-03-10',
      stats: { designs: 67, sales: 203, rating: 4.8 }
    },
    price: 156,
    likes: 3456,
    comments: 67,
    tags: ['boho', 'sustainable', 'handmade'],
    createdAt: '2024-01-03',
    category: 'Boho',
    shoppingOptions: {
      buy: true,
      thrift: true,
      rent: true
    }
  },
  {
    id: '4',
    title: 'Modern Minimalist',
    description: 'Clean lines and neutral colors define this modern minimalist approach to fashion.',
    images: [generateFashionPlaceholder(3)],
    creator: { 
      id: 'creator4',
      username: 'minimal_max',
      displayName: 'Maximilian Gray', 
      bio: 'Minimalist design expert',
      avatar: generateAvatarPlaceholder('Maximilian Gray'), 
      followers: 9876, 
      following: 234,
      isVerified: false,
      createdAt: '2023-04-05',
      stats: { designs: 28, sales: 89, rating: 4.6 }
    },
    price: 225,
    likes: 1998,
    comments: 34,
    tags: ['minimal', 'modern', 'neutral'],
    createdAt: '2024-01-04',
    category: 'Minimal',
    shoppingOptions: {
      buy: true,
      thrift: false,
      rent: true
    }
  },
  {
    id: '5',
    title: 'Vintage Revival',
    description: 'Authentic vintage pieces carefully curated for the modern wardrobe. Timeless style never goes out of fashion.',
    images: [generateFashionPlaceholder(4)],
    creator: { 
      id: 'creator5',
      username: 'vintage_vibe',
      displayName: 'Victoria Thompson', 
      bio: 'Vintage collector & curator',
      avatar: generateAvatarPlaceholder('Victoria Thompson'), 
      followers: 22340, 
      following: 567,
      isVerified: true,
      createdAt: '2023-05-12',
      stats: { designs: 89, sales: 345, rating: 4.9 }
    },
    price: 180,
    likes: 4567,
    comments: 89,
    tags: ['vintage', 'classic', 'timeless'],
    createdAt: '2024-01-05',
    category: 'Vintage',
    shoppingOptions: {
      buy: true,
      thrift: true,
      rent: false
    }
  },
  {
    id: '6',
    title: 'Athletic Luxury',
    description: 'High-end athleisure that seamlessly transitions from gym to street. Performance meets style.',
    images: [generateFashionPlaceholder(5)],
    creator: { 
      id: 'creator6',
      username: 'fit_fashionista',
      displayName: 'Marcus Johnson', 
      bio: 'Fitness & fashion influencer',
      avatar: generateAvatarPlaceholder('Marcus Johnson'), 
      followers: 18920, 
      following: 890,
      isVerified: true,
      createdAt: '2023-06-08',
      stats: { designs: 43, sales: 156, rating: 4.7 }
    },
    price: 95,
    likes: 3210,
    comments: 56,
    tags: ['athletic', 'luxury', 'performance'],
    createdAt: '2024-01-06',
    category: 'Athletic',
    shoppingOptions: {
      buy: true,
      thrift: false,
      rent: true
    }
  },
  {
    id: '7',
    title: 'Business Professional',
    description: 'Sharp, professional attire for the modern workplace. Command respect with confidence.',
    images: [generateFashionPlaceholder(6)],
    creator: { 
      id: 'creator7',
      username: 'corporate_chic',
      displayName: 'Sarah Williams', 
      bio: 'Corporate wardrobe consultant',
      avatar: generateAvatarPlaceholder('Sarah Williams'), 
      followers: 14560, 
      following: 432,
      isVerified: true,
      createdAt: '2023-07-22',
      stats: { designs: 56, sales: 198, rating: 4.8 }
    },
    price: 340,
    likes: 2789,
    comments: 41,
    tags: ['business', 'professional', 'formal'],
    createdAt: '2024-01-07',
    category: 'Business',
    shoppingOptions: {
      buy: true,
      thrift: false,
      rent: true
    }
  },
  {
    id: '8',
    title: 'Festival Ready',
    description: 'Bold and vibrant festival outfit designed to stand out in the crowd. Music and fashion collide.',
    images: [generateFashionPlaceholder(7)],
    creator: { 
      id: 'creator8',
      username: 'festival_fairy',
      displayName: 'Luna Martinez', 
      bio: 'Festival fashion designer',
      avatar: generateAvatarPlaceholder('Luna Martinez'), 
      followers: 25670, 
      following: 1123,
      isVerified: true,
      createdAt: '2023-08-14',
      stats: { designs: 78, sales: 267, rating: 4.9 }
    },
    price: 125,
    likes: 5432,
    comments: 123,
    tags: ['festival', 'bold', 'vibrant'],
    createdAt: '2024-01-08',
    category: 'Festival',
    shoppingOptions: {
      buy: true,
      thrift: true,
      rent: true
    }
  },
  {
    id: '9',
    title: 'Romantic Date Night',
    description: 'Soft, romantic pieces perfect for intimate dinners and special moments. Elegance with a touch of allure.',
    images: [generateFashionPlaceholder(8)],
    creator: { 
      id: 'creator9',
      username: 'romantic_rose',
      displayName: 'Rose Anderson', 
      bio: 'Romantic fashion stylist',
      avatar: generateAvatarPlaceholder('Rose Anderson'), 
      followers: 11890, 
      following: 345,
      isVerified: false,
      createdAt: '2023-09-03',
      stats: { designs: 34, sales: 112, rating: 4.6 }
    },
    price: 210,
    likes: 3098,
    comments: 67,
    tags: ['romantic', 'date', 'elegant'],
    createdAt: '2024-01-09',
    category: 'Date Night',
    shoppingOptions: {
      buy: true,
      thrift: false,
      rent: true
    }
  },
  {
    id: '10',
    title: 'Urban Explorer',
    description: 'Practical yet stylish urban wear for the city adventurer. Function meets fashion in perfect harmony.',
    images: [generateFashionPlaceholder(9)],
    creator: { 
      id: 'creator10',
      username: 'urban_explorer',
      displayName: 'Alex Kim', 
      bio: 'Urban fashion photographer',
      avatar: generateAvatarPlaceholder('Alex Kim'), 
      followers: 16780, 
      following: 678,
      isVerified: true,
      createdAt: '2023-10-18',
      stats: { designs: 52, sales: 187, rating: 4.7 }
    },
    price: 145,
    likes: 2876,
    comments: 45,
    tags: ['urban', 'practical', 'functional'],
    createdAt: '2024-01-10',
    category: 'Urban',
    shoppingOptions: {
      buy: true,
      thrift: true,
      rent: false
    }
  },
  {
    id: '11',
    title: 'Summer Breeze',
    description: 'Light and airy summer collection perfect for warm weather adventures. Comfort meets style.',
    images: [generateFashionPlaceholder(10)],
    creator: { 
      id: 'creator11',
      username: 'summer_style',
      displayName: 'Emma Davis', 
      bio: 'Summer fashion specialist',
      avatar: generateAvatarPlaceholder('Emma Davis'), 
      followers: 13450, 
      following: 234,
      isVerified: false,
      createdAt: '2023-11-07',
      stats: { designs: 41, sales: 134, rating: 4.5 }
    },
    price: 78,
    likes: 4123,
    comments: 78,
    tags: ['summer', 'light', 'comfortable'],
    createdAt: '2024-01-11',
    category: 'Summer',
    shoppingOptions: {
      buy: true,
      thrift: true,
      rent: true
    }
  },
  {
    id: '12',
    title: 'Winter Warrior',
    description: 'Stylish winter wear that keeps you warm without sacrificing fashion. Battle the cold in style.',
    images: [generateFashionPlaceholder(11)],
    creator: { 
      id: 'creator12',
      username: 'winter_wear',
      displayName: 'James Wilson', 
      bio: 'Winter fashion expert',
      avatar: generateAvatarPlaceholder('James Wilson'), 
      followers: 19870, 
      following: 567,
      isVerified: true,
      createdAt: '2023-12-15',
      stats: { designs: 63, sales: 234, rating: 4.8 }
    },
    price: 280,
    likes: 3567,
    comments: 89,
    tags: ['winter', 'warm', 'stylish'],
    createdAt: '2024-01-12',
    category: 'Winter',
    shoppingOptions: {
      buy: true,
      thrift: false,
      rent: true
    }
  }
];

export const designs = feedItems;
export const outfits = [];
export const contests = [];

export const users = feedItems.map(item => item.creator); 