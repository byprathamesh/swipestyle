import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

// Define a type for your notification data from Supabase
interface Notification {
  id: string;
  message: string | null;
  type: 'discount' | 'new_collection' | 'engagement' | 'generic'; // Example types
  created_at: string | null; // timestamp
  // You might also want 'read_status', 'link_url', etc.
}

const fetchNotifications = async (): Promise<Notification[]> => {
  // This is a placeholder query.
  // You'll need a 'notifications' table in Supabase.
  const { data, error } = await supabase
    .from("notifications") // Replace with your actual table name
    .select("id, message, type, created_at")
    .order("created_at", { ascending: false })
    .limit(8); // Match mock data length

  if (error) {
    console.error("Error fetching notifications:", error);
    return []; // Gracefully return empty on error
  }
  return data || [];
};

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
  switch (type) {
    case 'discount': return '💰';
    case 'new_collection': return '👗';
    case 'engagement': return '🔥';
    default: return '🔔'; // Generic bell icon
  }
};

const Notifications = () => {
  const { data: notifications, isLoading, isError, error } = useQuery<Notification[], Error>({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  // Basic time formatting (same as Messages.tsx, consider moving to a util if used often)
  const formatTimeAgo = (timestamp: string | null, index: number) => {
    if (!timestamp) return `${index + 1}h ago`; // Fallback
    const date = new Date(timestamp);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    if (diffSeconds < 60) return `Just now`;
    const diffMinutes = Math.round(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.round(diffMinutes / 60);
    return `${diffHours}h ago`;
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8 flex justify-center items-center">
        <p>Loading notifications...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8 flex justify-center items-center">
        <p>Error loading notifications: {error?.message || "Could not load notifications."}</p>
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Notifications</h1>
          <p>No new notifications.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pl-16 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Notifications</h1>
        <div className="space-y-3">
          {notifications.map((notification, i) => (
            <div key={notification.id} className="bg-black/30 rounded-xl overflow-hidden border border-white/10 p-3 animate-fade-in hover:bg-black/40 transition-colors">
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <NotificationIcon type={notification.type} />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    {notification.message || 'New notification'}
                  </p>
                </div>
                <div className="text-xs text-white/50">
                  {formatTimeAgo(notification.created_at, i)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications; 