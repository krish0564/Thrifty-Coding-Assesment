import { Heart, Frown, Minus, Clock } from "lucide-react";

const SentimentIcon = ({ sentiment }) => {
  switch (sentiment) {
    case "positive":
      return <Heart className="h-3 w-3" />;
    case "negative":
      return <Frown className="h-3 w-3" />;
    case "neutral":
      return <Minus className="h-3 w-3" />;
    case "pending":
      return <Clock className="h-3 w-3 animate-spin" />;
    default:
      return <Minus className="h-3 w-3" />;
  }
};

const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case "positive":
      return "bg-green-500 text-white";
    case "negative":
      return "bg-red-500 text-white";
    case "neutral":
      return "bg-gray-500 text-white";
    case "pending":
      return "bg-yellow-400 text-white animate-pulse";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

export default function ChatMessage({ message, isOwnMessage }) {
  const isSystemMessage = message.userId === "system";

  if (isSystemMessage) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
          {message.text}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col mb-4 ${
        isOwnMessage ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${
          isOwnMessage
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-800 border border-gray-200"
        }`}
      >
        {!isOwnMessage && (
          <div className="text-xs font-medium text-gray-400 mb-1">
            {message.userName}
          </div>
        )}
        <div className="text-sm leading-relaxed">{message.text}</div>
      </div>

      <div className="flex items-center gap-2 mt-1 px-1">
        <span
          className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full ${getSentimentColor(
            message.sentiment
          )}`}
        >
          <SentimentIcon sentiment={message.sentiment} />
          {message.sentiment === "pending" ? "Analyzing..." : message.sentiment}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
