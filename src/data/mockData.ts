
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
    title: "Neon Dreams Jacket",
    description: "Urban-inspired jacket with reflective detailing and neon pink accents. Perfect for night outings.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=700&fit=crop"
    ],
    price: 129.99,
    creator: users[0],
    likes: 2480,
    comments: 184,
    createdAt: "2023-11-10",
    category: "outerwear",
    tags: ["neon", "urban", "reflective", "jacket"]
  },
  {
    id: "d2",
    title: "Minimalist Cargo Pants",
    description: "Functional yet stylish cargo pants with clean lines and sustainable fabric.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=700&fit=crop"
    ],
    price: 89.99,
    creator: users[3],
    likes: 1756,
    comments: 92,
    createdAt: "2023-12-05",
    category: "bottom",
    tags: ["minimal", "sustainable", "cargo", "pants"]
  },
  {
    id: "d3",
    title: "Electric Blue Crop Top",
    description: "Vibrant crop top with geometric patterns and comfort stretch material.",
    images: [
      "https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1603217192634-61068e4d4bf9?w=500&h=700&fit=crop"
    ],
    price: 45.99,
    creator: users[2],
    likes: 3542,
    comments: 287,
    createdAt: "2024-01-12",
    category: "top",
    tags: ["crop", "blue", "vibrant", "geometric"]
  },
  {
    id: "d4",
    title: "Vintage Rework Denim",
    description: "Upcycled vintage denim with modern patchwork details. Eco-friendly and one-of-a-kind.",
    images: [
      "https://images.unsplash.com/photo-1608317300026-dc7ef4eb5829?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1608317300026-dc7ef4eb5829?w=500&h=700&fit=crop"
    ],
    price: 109.99,
    creator: users[4],
    likes: 1890,
    comments: 105,
    createdAt: "2024-02-08",
    category: "bottom",
    tags: ["vintage", "denim", "upcycled", "sustainable"]
  },
  {
    id: "d5",
    title: "Futuristic Platform Boots",
    description: "Statement platform boots with holographic accents and chunky heels.",
    images: [
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=500&h=700&fit=crop"
    ],
    price: 159.99,
    creator: users[0],
    likes: 2760,
    comments: 231,
    createdAt: "2024-03-15",
    category: "shoes",
    tags: ["platform", "boots", "holographic", "statement"]
  },
  {
    id: "d6",
    title: "Gradient Mesh Pullover",
    description: "Lightweight mesh pullover with color gradient effect. Perfect for layering.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=700&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=700&fit=crop"
    ],
    price: 79.99,
    creator: users[1],
    likes: 1458,
    comments: 87,
    createdAt: "2024-03-25",
    category: "top",
    tags: ["gradient", "mesh", "pullover", "layering"]
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
