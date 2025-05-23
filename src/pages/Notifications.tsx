import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  MessageCircle, 
  UserPlus, 
  ShoppingBag, 
  Star,
  Bell,
  Settings,
  Check,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NotificationData {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'purchase' | 'system' | 'contest';
  user: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  message: string;
  timestamp: string;
  read: boolean;
  actionRequired?: boolean;
  image?: string;
}

const generateAvatar = (name: string): string => {
  const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444'];
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
  const color = colors[name.length % colors.length];
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='28' font-family='Inter, sans-serif' font-weight='bold'%3E${initials}%3C/text%3E%3C/svg%3E`;
};

const generateImage = (type: string): string => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='white' font-size='12' font-family='Inter, sans-serif'%3E${type}%3C/text%3E%3C/svg%3E`;
};

const mockNotifications: NotificationData[] = [
  {
    id: '1',
    type: 'like',
    user: {
      id: 'user1',
      name: 'Emma Davis',
      avatar: generateAvatar('Emma Davis'),
      isVerified: true
    },
    message: 'liked your summer dress post',
    timestamp: '2m',
    read: false,
    image: generateImage('Post')
  },
  {
    id: '2',
    type: 'follow',
    user: {
      id: 'user2',
      name: 'Marcus Johnson',
      avatar: generateAvatar('Marcus Johnson'),
      isVerified: false
    },
    message: 'started following you',
    timestamp: '15m',
    read: false,
    actionRequired: true
  },
  {
    id: '3',
    type: 'comment',
    user: {
      id: 'user3',
      name: 'Sarah Williams',
      avatar: generateAvatar('Sarah Williams'),
      isVerified: true
    },
    message: 'commented: "Where did you get those amazing boots?"',
    timestamp: '1h',
    read: false,
    image: generateImage('Post')
  },
  {
    id: '4',
    type: 'purchase',
    user: {
      id: 'user4',
      name: 'SwipeStyle',
      avatar: generateAvatar('SwipeStyle'),
      isVerified: true
    },
    message: 'Your order #SS-12345 has been shipped! Track your package.',
    timestamp: '2h',
    read: true
  },
  {
    id: '5',
    type: 'system',
    user: {
      id: 'system',
      name: 'SwipeStyle',
      avatar: generateAvatar('SwipeStyle'),
      isVerified: true
    },
    message: 'Weekly style report is ready! You had 127 likes this week 🎉',
    timestamp: '1d',
    read: true
  },
  {
    id: '6',
    type: 'contest',
    user: {
      id: 'contest',
      name: 'SwipeStyle',
      avatar: generateAvatar('SwipeStyle'),
      isVerified: true
    },
    message: 'New contest: "Best Summer Look" - Submit your entry now!',
    timestamp: '2d',
    read: true,
    image: generateImage('Contest')
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const isMobile = useIsMobile();

  const filteredNotifications = notifications.filter(notif => 
    filter === 'all' || !notif.read
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment': return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'follow': return <UserPlus className="w-4 h-4 text-green-500" />;
      case 'purchase': return <ShoppingBag className="w-4 h-4 text-purple-500" />;
      case 'contest': return <Star className="w-4 h-4 text-yellow-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleFollowAction = (notificationId: string, action: 'accept' | 'decline') => {
    console.log(`${action} follow request for notification ${notificationId}`);
    markAsRead(notificationId);
  };

  return (
    <div className={`min-h-screen bg-black text-white ${isMobile ? 'pb-16' : 'pl-16'}`}>
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white px-2 py-1">
                {unreadCount}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="text-white hover:bg-white/10"
            >
              <Check className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-white text-black' : 'text-white hover:bg-white/10'}
          >
            All
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'ghost'}
            onClick={() => setFilter('unread')}
            className={filter === 'unread' ? 'bg-white text-black' : 'text-white hover:bg-white/10'}
          >
            Unread ({unreadCount})
          </Button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No notifications</h3>
              <p className="text-gray-400">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications." 
                  : "You'll see notifications here when you get them."}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                  notification.read
                    ? 'bg-gray-900/30 border-gray-800/50'
                    : 'bg-gray-800/50 border-gray-700'
                }`}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar with notification icon */}
                  <div className="relative">
                    <img
                      src={notification.user.avatar}
                      alt={notification.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-semibold">
                            {notification.user.name}
                            {notification.user.isVerified && (
                              <span className="ml-1 text-blue-500">✓</span>
                            )}
                          </span>
                          <span className="text-gray-300 ml-1">
                            {notification.message}
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.timestamp}
                        </p>
                      </div>

                      {/* Post thumbnail or action buttons */}
                      <div className="flex items-center gap-2">
                        {notification.image && (
                          <img
                            src={notification.image}
                            alt="Post"
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        
                        {notification.actionRequired && notification.type === 'follow' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFollowAction(notification.id, 'accept');
                              }}
                              className="bg-white text-black hover:bg-gray-200 px-3 py-1"
                            >
                              Follow
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFollowAction(notification.id, 'decline');
                              }}
                              className="border-gray-600 text-white hover:bg-gray-800 px-3 py-1"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Unread indicator */}
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More (placeholder) */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              Load more notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications; 