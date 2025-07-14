import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({
  onSendMessage = () => {},
  disabled = false,
}) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-white p-4">
      <div className="flex gap-3 items-end">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          disabled={disabled}
          maxLength={500}
          className="flex-1 min-h-[44px] px-3 py-2 border rounded-md shadow-sm focus:outline-none text-black focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="min-w-[44px] h-[44px] bg-blue-600 hover:bg-blue-700 text-blue-800 p-2 rounded-md disabled:opacity-50 flex items-center justify-center"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>

      {message.length > 400 && (
        <div className="text-xs text-gray-500 mt-1 text-right">
          {message.length}/500
        </div>
      )}
    </div>
  );
}
