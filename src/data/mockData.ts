import { User, Design, Outfit, Contest, Notification } from "../types";

// Mock Users
export const users: User[] = [
  {
    id: "u1",
    username: "sophie_designs",
    displayName: "Sophie Chen",
    bio: "Fashion designer specializing in sustainable streetwear. Based in NYC.",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=256&h=256&fit=crop&crop=faces",
    followers: 15200,
    following: 342,
    isVerified: true,
    createdAt: "2023-01-15",
    stats: {
      designs: 48,
      sales: 1240,
      rating: 4.9
    }
  },
  {
    id: "u2",
    username: "marcus_smith",
    displayName: "Marcus Smith",
    bio: "Bringing urban aesthetics to high fashion. London-based designer.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=faces",
    followers: 8750,
    following: 412,
    isVerified: true,
    createdAt: "2023-02-20",
    stats: {
      designs: 36,
      sales: 820,
      rating: 4.7
    }
  },
  {
    id: "u3",
    username: "zoe_fashion",
    displayName: "Zoe Williams",
    bio: "Creating bold, expressive pieces that make a statement. Miami vibes.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&h=256&fit=crop&crop=faces",
    followers: 22400,
    following: 215,
    isVerified: true,
    createdAt: "2022-11-05",
    stats: {
      designs: 72,
      sales: 2450,
      rating: 4.8
    }
  },
  {
    id: "u4",
    username: "jayden_creates",
    displayName: "Jayden Park",
    bio: "Minimalist designs with maximum impact. Seoul → LA.",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=256&h=256&fit=crop&crop=faces",
    followers: 12800,
    following: 375,
    isVerified: false,
    createdAt: "2023-03-10",
    stats: {
      designs: 31,
      sales: 905,
      rating: 4.6
    }
  },
  {
    id: "u5",
    username: "aria_style",
    displayName: "Aria Johnson",
    bio: "Vintage-inspired modern fashion. Making old new again.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=256&h=256&fit=crop&crop=faces",
    followers: 9300,
    following: 280,
    isVerified: false,
    createdAt: "2023-04-22",
    stats: {
      designs: 24,
      sales: 610,
      rating: 4.8
    }
  }
];

// Mock Designs
export const designs: Design[] = [
  {
    id: "d1",
    title: "Zendaya at Met Gala",
    description: "Zendaya in a stunning silver gown at the Met Gala.",
    images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=700&fit=crop"],
    price: 299.99,
    creator: users[0],
    likes: 4120,
    comments: 210,
    createdAt: "2024-04-01",
    category: "dress",
    tags: ["celebrity", "gown", "Met Gala"]
  },
  {
    id: "d2",
    title: "Street Style in Paris",
    description: "Chic street style look captured during Paris Fashion Week.",
    images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&h=700&fit=crop"],
    price: 109.99,
    creator: users[1],
    likes: 3200,
    comments: 150,
    createdAt: "2024-04-02",
    category: "outerwear",
    tags: ["streetwear", "Paris", "fashion week"]
  },
  {
    id: "d3",
    title: "Runway Metallic Suit",
    description: "Futuristic metallic suit from the latest runway show.",
    images: ["https://images.unsplash.com/photo-1469398715555-76331a6c7c9b?w=500&h=700&fit=crop"],
    price: 399.99,
    creator: users[2],
    likes: 2780,
    comments: 120,
    createdAt: "2024-04-03",
    category: "suit",
    tags: ["runway", "metallic", "futuristic"]
  },
  {
    id: "d4",
    title: "Minimalist White Dress",
    description: "Chic minimalist white dress for summer.",
    images: ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=700&fit=crop"],
    price: 89.99,
    creator: users[3],
    likes: 1980,
    comments: 90,
    createdAt: "2024-04-04",
    category: "dress",
    tags: ["minimalist", "white", "summer"]
  },
  {
    id: "d5",
    title: "Fashion Week Statement Coat",
    description: "Bold statement coat from Fashion Week.",
    images: ["https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&h=700&fit=crop"],
    price: 259.99,
    creator: users[4],
    likes: 3500,
    comments: 180,
    createdAt: "2024-04-05",
    category: "outerwear",
    tags: ["fashion week", "statement", "coat"]
  },
  {
    id: "d6",
    title: "Accessories Pop Look",
    description: "Colorful accessories to complete your look.",
    images: ["https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=700&fit=crop"],
    price: 39.99,
    creator: users[0],
    likes: 1200,
    comments: 60,
    createdAt: "2024-04-06",
    category: "accessory",
    tags: ["accessory", "colorful", "pop"]
  },
  {
    id: "d7",
    title: "Hailey Bieber Street Style",
    description: "Hailey Bieber in a casual chic street look.",
    images: ["https://images.unsplash.com/photo-1517260911205-8c6b8b6b7b8b?w=500&h=700&fit=crop"],
    price: 129.99,
    creator: users[1],
    likes: 2100,
    comments: 80,
    createdAt: "2024-04-07",
    category: "streetwear",
    tags: ["celebrity", "street style", "Hailey Bieber"]
  },
  {
    id: "d8",
    title: "Classic Black Tuxedo",
    description: "Timeless black tuxedo as seen on the red carpet.",
    images: ["https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&h=700&fit=crop"],
    price: 199.99,
    creator: users[2],
    likes: 1800,
    comments: 70,
    createdAt: "2024-04-08",
    category: "suit",
    tags: ["tuxedo", "red carpet", "classic"]
  },
  {
    id: "d9",
    title: "Gigi Hadid Runway Look",
    description: "Gigi Hadid in a bold runway ensemble.",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=700&fit=crop"],
    price: 349.99,
    creator: users[3],
    likes: 2500,
    comments: 110,
    createdAt: "2024-04-09",
    category: "runway",
    tags: ["celebrity", "runway", "Gigi Hadid"]
  },
  {
    id: "d10",
    title: "Vintage Denim Jacket",
    description: "Retro-inspired denim jacket for everyday style.",
    images: ["https://images.unsplash.com/photo-1608317300026-dc7ef4eb5829?w=500&h=700&fit=crop"],
    price: 99.99,
    creator: users[4],
    likes: 1700,
    comments: 65,
    createdAt: "2024-04-10",
    category: "outerwear",
    tags: ["vintage", "denim", "jacket"]
  },
  {
    id: "d11",
    title: "Bella Hadid Editorial",
    description: "Bella Hadid in a high-fashion editorial shoot.",
    images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=700&fit=crop"],
    price: 299.99,
    creator: users[0],
    likes: 2200,
    comments: 95,
    createdAt: "2024-04-11",
    category: "editorial",
    tags: ["celebrity", "editorial", "Bella Hadid"]
  },
  {
    id: "d12",
    title: "Men's Streetwear Layering",
    description: "Layered streetwear look for men.",
    images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=700&fit=crop"],
    price: 119.99,
    creator: users[1],
    likes: 1600,
    comments: 55,
    createdAt: "2024-04-12",
    category: "streetwear",
    tags: ["men", "streetwear", "layering"]
  },
  {
    id: "d13",
    title: "Rihanna Met Gala Look",
    description: "Rihanna in an iconic Met Gala outfit.",
    images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=700&fit=crop"],
    price: 399.99,
    creator: users[2],
    likes: 3300,
    comments: 140,
    createdAt: "2024-04-13",
    category: "celebrity",
    tags: ["Rihanna", "Met Gala", "celebrity"]
  },
  {
    id: "d14",
    title: "Summer Boho Dress",
    description: "Flowy boho dress perfect for summer festivals.",
    images: ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=700&fit=crop"],
    price: 79.99,
    creator: users[3],
    likes: 1400,
    comments: 50,
    createdAt: "2024-04-14",
    category: "dress",
    tags: ["boho", "summer", "festival"]
  },
  {
    id: "d15",
    title: "Classic Trench Coat",
    description: "Timeless beige trench coat for all seasons.",
    images: ["https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=500&h=700&fit=crop"],
    price: 149.99,
    creator: users[4],
    likes: 2100,
    comments: 85,
    createdAt: "2024-04-15",
    category: "outerwear",
    tags: ["trench coat", "classic", "timeless"]
  },
  {
    id: "d16",
    title: "Evening Glamour Dress",
    description: "Elegant evening dress with sequin details.",
    images: ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=700&fit=crop"],
    price: 259.99,
    creator: users[0],
    likes: 2700,
    comments: 100,
    createdAt: "2024-04-16",
    category: "dress",
    tags: ["evening", "glamour", "sequin"]
  },
  {
    id: "d17",
    title: "Kendall Jenner Street Style",
    description: "Kendall Jenner in a trendy streetwear look.",
    images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&h=700&fit=crop"],
    price: 139.99,
    creator: users[1],
    likes: 1900,
    comments: 75,
    createdAt: "2024-04-17",
    category: "streetwear",
    tags: ["Kendall Jenner", "street style", "celebrity"]
  },
  {
    id: "d18",
    title: "Men's Classic Suit",
    description: "Sharp classic suit for formal occasions.",
    images: ["https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&h=700&fit=crop"],
    price: 189.99,
    creator: users[2],
    likes: 1750,
    comments: 65,
    createdAt: "2024-04-18",
    category: "suit",
    tags: ["men", "classic", "suit"]
  },
  {
    id: "d19",
    title: "Festival Fringe Jacket",
    description: "Statement fringe jacket for music festivals.",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&h=700&fit=crop"],
    price: 119.99,
    creator: users[3],
    likes: 1300,
    comments: 45,
    createdAt: "2024-04-19",
    category: "outerwear",
    tags: ["festival", "fringe", "jacket"]
  },
  {
    id: "d20",
    title: "Chic Plaid Skirt Outfit",
    description: "Trendy plaid skirt paired with a fitted top.",
    images: ["https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=500&h=700&fit=crop"],
    price: 69.99,
    creator: users[4],
    likes: 1100,
    comments: 40,
    createdAt: "2024-04-20",
    category: "skirt",
    tags: ["plaid", "skirt", "chic"]
  }
];

// Mock Outfits
export const outfits: Outfit[] = [
  {
    id: "o1",
    title: "Urban Night Explorer",
    description: "Perfect outfit for exploring the city after dark. Combines comfort with eye-catching style.",
    items: [
      {
        id: "oi1",
        designId: "d1",
        type: "outerwear",
        image: designs[0].images[0],
        title: designs[0].title,
        price: designs[0].price
      },
      {
        id: "oi2",
        designId: "d2",
        type: "bottom",
        image: designs[1].images[0],
        title: designs[1].title,
        price: designs[1].price
      },
      {
        id: "oi3",
        designId: "d5",
        type: "shoes",
        image: designs[4].images[0],
        title: designs[4].title,
        price: designs[4].price
      }
    ],
    creator: users[0],
    likes: 4350,
    comments: 312,
    createdAt: "2024-01-20",
    tags: ["urban", "night", "futuristic", "streetwear"]
  },
  {
    id: "o2",
    title: "Vintage Future Fusion",
    description: "A perfect blend of retro elements with futuristic accents. Nostalgic yet progressive.",
    items: [
      {
        id: "oi4",
        designId: "d3",
        type: "top",
        image: designs[2].images[0],
        title: designs[2].title,
        price: designs[2].price
      },
      {
        id: "oi5",
        designId: "d4",
        type: "bottom",
        image: designs[3].images[0],
        title: designs[3].title,
        price: designs[3].price
      }
    ],
    creator: users[4],
    likes: 3120,
    comments: 187,
    createdAt: "2024-02-15",
    tags: ["vintage", "fusion", "retro", "modern"]
  },
  {
    id: "o3",
    title: "Gradient Minimalist",
    description: "Clean lines meet eye-catching colors. Minimalism doesn't have to be boring.",
    items: [
      {
        id: "oi6",
        designId: "d6",
        type: "top",
        image: designs[5].images[0],
        title: designs[5].title,
        price: designs[5].price
      },
      {
        id: "oi7",
        designId: "d2",
        type: "bottom",
        image: designs[1].images[0],
        title: designs[1].title,
        price: designs[1].price
      }
    ],
    creator: users[3],
    likes: 2870,
    comments: 143,
    createdAt: "2024-03-22",
    tags: ["minimalist", "gradient", "clean", "casual"]
  }
];

// Mock Contests
export const contests: Contest[] = [
  {
    id: "c1",
    title: "Summer Streetwear Challenge",
    description: "Create innovative streetwear designs for the upcoming summer season. Focus on sustainability and bold colors.",
    startDate: "2024-04-01",
    endDate: "2024-05-15",
    prizes: ["$5,000 Cash Prize", "Featured Collection", "Mentorship with Top Designer"],
    entries: 342,
    coverImage: "https://images.unsplash.com/photo-1520013135029-3c318940d2a5?w=1200&h=600&fit=crop",
    status: "ongoing"
  },
  {
    id: "c2",
    title: "Sustainable Fashion Innovation",
    description: "Design clothing using only recycled or upcycled materials. Push the boundaries of sustainable fashion.",
    startDate: "2024-05-10",
    endDate: "2024-06-30",
    prizes: ["$10,000 Cash Prize", "Featured in SwipeStyle Magazine", "Production Contract"],
    entries: 0,
    coverImage: "https://images.unsplash.com/photo-1569563068442-e845aff290c3?w=1200&h=600&fit=crop",
    status: "upcoming"
  },
  {
    id: "c3",
    title: "Retro Revival",
    description: "Reimagine styles from the 70s, 80s, or 90s with a modern twist. Make the old new again!",
    startDate: "2024-02-01",
    endDate: "2024-03-15",
    prizes: ["$7,500 Cash Prize", "Vintage Fashion Week Showcase", "Collaboration with Vintage Brand"],
    entries: 287,
    coverImage: "https://images.unsplash.com/photo-1564137799561-7dde2eeb8220?w=1200&h=600&fit=crop",
    status: "ended"
  }
];

// Mock Notifications
export const notifications: Notification[] = [
  {
    id: "n1",
    type: "like",
    message: "Sophie Chen liked your design 'Gradient Mesh Pullover'",
    createdAt: "2024-04-10T14:32:00Z",
    read: false,
    data: {
      userId: "u1",
      designId: "d6"
    }
  },
  {
    id: "n2",
    type: "comment",
    message: "Marcus Smith commented on your outfit 'Urban Night Explorer'",
    createdAt: "2024-04-09T09:15:00Z",
    read: true,
    data: {
      userId: "u2",
      outfitId: "o1"
    }
  },
  {
    id: "n3",
    type: "follow",
    message: "Zoe Williams started following you",
    createdAt: "2024-04-08T16:47:00Z",
    read: true,
    data: {
      userId: "u3"
    }
  },
  {
    id: "n4",
    type: "purchase",
    message: "Someone purchased your design 'Electric Blue Crop Top'",
    createdAt: "2024-04-07T10:23:00Z",
    read: false,
    data: {
      designId: "d3"
    }
  },
  {
    id: "n5",
    type: "contest",
    message: "New contest announced: Summer Streetwear Challenge",
    createdAt: "2024-04-01T08:00:00Z",
    read: true,
    data: {
      contestId: "c1"
    }
  },
  {
    id: "n6",
    type: "system",
    message: "Welcome to SwipeStyle! Complete your profile to get started.",
    createdAt: "2024-03-30T12:00:00Z",
    read: true
  }
];

// Feed Items (combines designs and outfits for the main feed)
export const feedItems = [...designs, ...outfits].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);
