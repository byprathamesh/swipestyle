import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";

// Define a type for your message data from Supabase
interface Message {
  id: string;
  text_content: string | null;
  created_at: string | null; // timestamp
  sender_name: string | null; // Ideally from a joined 'profiles' table
  sender_avatar_url: string | null; // Ideally from a joined 'profiles' table
  // Example: If joining with 'profiles' on a 'sender_id' column in 'messages' table
  // profiles?: { display_name: string | null; avatar_url: string | null; } | null;
}

const fetchMessages = async (): Promise<Message[]> => {
  // This is a placeholder query.
  // You'll need a 'messages' table and likely a 'profiles' table for sender info.
  // Example: Fetch messages and related sender profiles
  // const { data, error } = await supabase
  //   .from("messages")
  //   .select(`
  //     id,
  //     text_content,
  //     created_at,
  //     profiles ( display_name, avatar_url )
  //   `)
  //   .order("created_at", { ascending: false })
  //   .limit(5);

  // For now, let's simulate a simple fetch from a 'messages' table
  // You'll need to create this table and populate it.
  // The select below assumes 'sender_name' and 'sender_avatar_url' are columns in 'messages'
  // or you adjust this to use a join as commented above.
  const { data, error } = await supabase
    .from("messages") // Replace with your actual table name
    .select("id, text_content, created_at, sender_name, sender_avatar_url")
    .order("created_at", { ascending: false })
    .limit(5); // Match mock data length

  if (error) {
    console.error("Error fetching messages:", error);
    // For a user-facing app, you might not want to throw here directly
    // but handle it more gracefully in the UI.
    // Returning an empty array or a specific error object might be better.
    return []; // Gracefully return empty on error for now
  }
  return data || [];
};

const Messages = () => {
  const { data: messages, isLoading, isError, error } = useQuery<Message[], Error>({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8 flex justify-center items-center">
        <p>Loading messages...</p>
      </div>
    );
  }

  if (isError) {
    // Note: The fetchMessages function currently returns [] on error, so isError might not trigger
    // as expected unless the fetchMessages function re-throws the error.
    return (
      <div className="min-h-screen bg-background pl-16 pt-8 flex justify-center items-center">
        <p>Error loading messages: {error?.message || "Could not load messages."}</p>
      </div>
    );
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="min-h-screen bg-background pl-16 pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Messages</h1>
          <p>No messages found.</p>
        </div>
      </div>
    );
  }
  
  // Helper to format time (very basic)
  const formatTimeAgo = (timestamp: string | null, index: number) => {
    if (!timestamp) return `${index + 1}d ago`; // Fallback
    // This is a very naive implementation. Use a library like date-fns for real apps.
    const date = new Date(timestamp);
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.round(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  };


  return (
    <div className="min-h-screen bg-background pl-16 pt-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        <div className="space-y-3">
          {messages.map((message, i) => (
            <div key={message.id} className="bg-black/30 rounded-xl overflow-hidden border border-white/10 p-4 animate-fade-in hover:bg-black/40 transition-colors cursor-pointer">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden">
                  <img
                    src={message.sender_avatar_url || '/assets/avatars/default.png'} // Fallback avatar
                    alt={message.sender_name || 'Sender'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{message.sender_name || 'Anonymous Sender'}</h3>
                  <p className="text-sm text-white/70">{message.text_content || 'No content'}</p>
                </div>
                <div className="text-xs text-white/50">
                  {formatTimeAgo(message.created_at, i)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages; 