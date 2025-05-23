import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MessageCircle, 
  Send, 
  Heart, 
  Phone, 
  Video, 
  MoreHorizontal,
  Camera,
  Paperclip
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  isRead: boolean;
}

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}

const generateAvatar = (name: string): string => {
  const colors = ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#EF4444'];
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);
  const color = colors[name.length % colors.length];
  
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='${encodeURIComponent(color)}'/%3E%3Ctext x='50' y='60' text-anchor='middle' fill='white' font-size='28' font-family='Inter, sans-serif' font-weight='bold'%3E${initials}%3C/text%3E%3C/svg%3E`;
};

const mockConversations: Conversation[] = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Emma Davis',
      avatar: generateAvatar('Emma Davis'),
      isOnline: true
    },
    lastMessage: 'Love that summer dress! Where did you get it?',
    timestamp: '2m',
    unreadCount: 2,
    messages: [
      { id: '1', senderId: 'user1', text: 'Hey! I saw your latest post', timestamp: '10:30 AM', isMe: false, isRead: true },
      { id: '2', senderId: 'me', text: 'Thank you! Which one?', timestamp: '10:32 AM', isMe: true, isRead: true },
      { id: '3', senderId: 'user1', text: 'Love that summer dress! Where did you get it?', timestamp: '10:35 AM', isMe: false, isRead: false }
    ]
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Marcus Johnson',
      avatar: generateAvatar('Marcus Johnson'),
      isOnline: false
    },
    lastMessage: 'Those sneakers are fire! 🔥',
    timestamp: '1h',
    unreadCount: 0,
    messages: [
      { id: '1', senderId: 'user2', text: 'Those sneakers are fire! 🔥', timestamp: '9:15 AM', isMe: false, isRead: true }
    ]
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Sarah Williams',
      avatar: generateAvatar('Sarah Williams'),
      isOnline: true
    },
    lastMessage: 'Want to collab on a business look?',
    timestamp: '3h',
    unreadCount: 1,
    messages: [
      { id: '1', senderId: 'user3', text: 'Want to collab on a business look?', timestamp: '7:20 AM', isMe: false, isRead: false }
    ]
  }
];

const Messages = () => {
  const [conversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;
    
    // In a real app, you would send this to your backend
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  if (isMobile && selectedConversation) {
    // Mobile: Full screen chat view
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Chat Header */}
        <div className="bg-black/90 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedConversation(null)}
              className="text-white hover:bg-white/10"
            >
              ←
            </Button>
            <div className="relative">
              <img
                src={selectedConversation.user.avatar}
                alt={selectedConversation.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {selectedConversation.user.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold">{selectedConversation.user.name}</h2>
              <p className="text-xs text-gray-400">
                {selectedConversation.user.isOnline ? 'Active now' : 'Last seen recently'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Video className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {selectedConversation.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.isMe
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-black/90 backdrop-blur-md border-t border-white/10 p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
              <Camera className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-gray-800/50 border-gray-600/30 text-white placeholder-gray-400"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="bg-white text-black hover:bg-gray-200 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout or mobile conversation list
  return (
    <div className={`min-h-screen bg-black text-white ${isMobile ? 'pb-16' : 'pl-16'}`}>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800/50 border-gray-600/30 text-white placeholder-gray-400"
          />
        </div>

        {/* Conversations Grid/List */}
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : selectedConversation ? 'grid-cols-2' : 'grid-cols-1'}`}>
          
          {/* Conversations List */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold mb-4">Conversations</h2>
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 rounded-xl cursor-pointer transition-colors ${
                  selectedConversation?.id === conversation.id
                    ? 'bg-white/10'
                    : 'bg-gray-800/30 hover:bg-gray-800/50'
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conversation.user.avatar}
                      alt={conversation.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.user.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold truncate">{conversation.user.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{conversation.timestamp}</span>
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-white text-black text-xs px-2 py-0">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat View (Desktop only) */}
          {!isMobile && selectedConversation && (
            <div className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gray-800/50 p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={selectedConversation.user.avatar}
                        alt={selectedConversation.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedConversation.user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold">{selectedConversation.user.name}</h2>
                      <p className="text-xs text-gray-400">
                        {selectedConversation.user.isOnline ? 'Active now' : 'Last seen recently'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 p-4 space-y-4 overflow-y-auto">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.isMe
                          ? 'bg-white text-black'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-gray-800/50 p-4 border-t border-gray-700">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Camera className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    placeholder="Message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-gray-700/50 border-gray-600/30 text-white placeholder-gray-400"
                  />
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="bg-white text-black hover:bg-gray-200 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {!selectedConversation && !isMobile && (
          <div className="text-center text-gray-400 mt-12">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
            <p>Send private photos and messages to a friend or group.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages; 