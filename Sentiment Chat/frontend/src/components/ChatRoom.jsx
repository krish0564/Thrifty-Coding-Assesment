import { useEffect, useRef } from "react";
import { MessageCircle, Users, Brain, Wifi, LogOut } from "lucide-react";
import ChatMessage from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useSocket } from "../hooks/useSocket";

export default function ChatRoom({
  userName,
  userId,
  connectedUsers,
  onLeave,
}) {
  const { messages, sendMessage } = useSocket(userId, userName);
  const messagesEndRef = useRef(null);

  const handleSendMessage = (text) => {
    const messageObj = {
      userId,
      userName,
      text,
      timestamp: new Date(),
      sentiment: "pending",
    };
    sendMessage(messageObj);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <div className="bg-white border-b shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Global Chat</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Wifi className="h-3 w-3 text-green-500" />
                <span>Connected as {userName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-gray-100 text-sm rounded flex items-center gap-1">
              <Users className="h-3 w-3" />
              {connectedUsers} online
            </span>
            <button
              onClick={onLeave}
              className="flex items-center gap-2 border px-3 py-1 text-sm rounded hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Leave</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          {messages.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <MessageCircle className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-lg font-medium mb-2">No messages yet</h3>
              <p className="text-sm">Be the first to start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message._id || message.id}
                message={message}
                isOwnMessage={message.userId === userId}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
