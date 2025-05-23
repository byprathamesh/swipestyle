# 🎨 SwipeStyle - Tinder for Fashion

[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-4.0+-green.svg)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.0+-blue.svg)](https://tailwindcss.com)

**SwipeStyle** is a modern fashion discovery app that combines the addictive swiping mechanics of Tinder with fashion inspiration. Discover, like, and save your favorite outfits with an Instagram-inspired design and advanced features.

![SwipeStyle Preview](https://via.placeholder.com/800x400/000000/FFFFFF?text=SwipeStyle+Fashion+App)

## ✨ Features

### 🔥 Core Functionality
- **🎯 Swipe Mechanics**: Smooth card-based swiping with haptic feedback
- **🤖 AI Recommendations**: Get personalized outfit suggestions
- **📱 Responsive Design**: Perfect on mobile and desktop
- **🌙 Dark Theme**: Instagram-inspired black & white aesthetic
- **♿ Accessibility**: Full WCAG 2.1 AA compliance with keyboard navigation

### 📋 Complete Pages
- **🏠 Home**: Fashion discovery with swipe interface
- **💬 Messages**: Instagram-style messaging system
- **🔔 Notifications**: Comprehensive notification center
- **🔍 Discover**: Browse fashion with advanced filtering
- **💖 Saved**: Your liked items collection
- **⭐ Celebrity**: Celebrity fashion inspiration
- **👤 Profile**: User profiles and statistics
- **📊 Detail**: Complete item views with shopping options

### 🚀 Advanced Features
- **Haptic Feedback**: Mobile vibration patterns for swipes
- **Image Upload**: Add your own fashion photos
- **Category Filtering**: Filter by style, occasion, and more
- **Price Comparison**: Find similar items at different price points
- **Shopping Options**: Buy, rent, or find thrifted alternatives
- **Real-time Status**: Online/offline detection
- **Error Boundaries**: Graceful error handling
- **Performance Optimized**: Code splitting and lazy loading

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 4 + SWC
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Hooks + Local Storage
- **Mobile**: PWA-ready with responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/byprathamesh/swipestyle.git
   cd swipestyle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8081
   ```

### Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## 📱 Usage

### Basic Navigation
- **Mobile**: Use bottom navigation bar
- **Desktop**: Side navigation panel

### Swiping
- **👆 Swipe Right / ➡️**: Like an item
- **👆 Swipe Left / ⬅️**: Pass on an item  
- **🖱️ Desktop**: Use arrow keys or drag with mouse
- **⌨️ Keyboard**: Arrow keys to swipe, Enter for details

### AI Features
- **✨ AI Button**: Get personalized outfit recommendations
- **🎯 Smart Categories**: App learns your preferences
- **📊 Analytics**: Track your style metrics

### Messaging
- **💬 Conversations**: Chat with other fashion enthusiasts
- **📞 Voice/Video**: Call buttons for future implementation
- **📷 Media Sharing**: Send photos and attachments

## 🎨 Design System

### Color Palette
```css
/* Primary Colors */
--black: #000000
--white: #FFFFFF
--gray-900: #111827
--gray-800: #1F2937
--gray-700: #374151

/* Accent Colors */
--purple-600: #9333EA
--pink-600: #DB2777
--blue-500: #3B82F6
--green-500: #10B981
--red-500: #EF4444
```

### Typography
- **Font Family**: Inter (system fallback)
- **Headings**: Bold, clean hierarchy
- **Body**: Readable spacing and contrast

## 📁 Project Structure

```
swipestyle/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── SwipeCard.tsx # Main swipe component
│   │   └── Navigation.tsx # App navigation
│   ├── pages/            # Page components
│   │   ├── Home.tsx      # Main swipe interface
│   │   ├── Messages.tsx  # Messaging system
│   │   └── ...
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── data/             # Mock data and types
│   └── types/            # TypeScript definitions
├── package.json
└── README.md
```

## 🧪 Testing

```bash
# Run accessibility tests
npm run test:a11y

# Performance analysis
npm run analyze

# Type checking
npm run type-check
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file for customization:

```env
VITE_APP_TITLE=SwipeStyle
VITE_API_URL=your-api-url
VITE_ENABLE_ANALYTICS=true
```

### PWA Configuration
The app is PWA-ready with offline support. Customize in `public/manifest.json`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind for styling
- Ensure accessibility compliance
- Add proper error handling
- Write descriptive commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Instagram, Tinder
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fashion Data**: Mock data for demonstration

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/byprathamesh/swipestyle/issues)
- **Discussions**: [GitHub Discussions](https://github.com/byprathamesh/swipestyle/discussions)
- **Email**: prathamesh@swipestyle.app

## 🔮 Roadmap

- [ ] Backend API integration
- [ ] Real user authentication
- [ ] Social features expansion
- [ ] AI recommendation engine
- [ ] E-commerce integration
- [ ] Mobile app (React Native)
- [ ] AR try-on features
- [ ] Community marketplace

---

**Made with ❤️ by [Prathamesh](https://github.com/byprathamesh)**

*SwipeStyle - Where Fashion Meets Technology* 🎨✨ 